import * as crypto from "crypto";
import { Express, Request } from "express";
import { Model, Types, model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { PublicTaskListType, PublicTaskType } from "../models/PublicTaskList";
import { TaskListType, TaskType, TaskTypeIncoming } from "../models/TaskList";
import { ValidUserType } from "../models/User";
import { assertRequestWithUser } from "../types";

const Task = model<TaskType>("task");
const TaskList = model<TaskListType>("taskList");
const PublicTask = model<PublicTaskType>("publicTask");
const PublicTaskList = model<PublicTaskListType>("publicTaskList");

const taskRoutes = (app: Express) => {
  app.get("/api/tasks/user", requireJwt, async (req, res) => {
    assertRequestWithUser(req);

    try {
      const data = await TaskList.findOne<TaskListType>({
        _user: req.user._id,
      })
        .select("tasks")
        .exec();

      return res.send(data ? data.tasks.map((task) => task) : false);
    } catch (err) {
      return res.status(500).send("Issue retrieving task list, server error");
    }
  });

  app.get("/api/wall_tasks/user", requireJwt, async (req, res) => {
    assertRequestWithUser(req);

    try {
      const data = await PublicTaskList.findOne({ _user: req.user._id })
        .select("tasks")
        .exec();

      return res.send(data ? data.tasks.map((task) => task) : false);
    } catch (err) {
      return res
        .status(500)
        .send("Issue retrieving user task wall tasks, server error");
    }
  });

  app.get("/api/wall_tasks/all", requireJwt, async (req, res) => {
    try {
      const publicTasks = await PublicTaskList.find({
        totalTasks: { $gt: 0 },
      })
        .select(["tasks", "-_id"])
        .exec();

      let allPublicTasks: PublicTaskType[] = [];

      publicTasks.forEach(({ tasks }) => {
        return allPublicTasks.push(...tasks);
      });

      return res.send(allPublicTasks || false);
    } catch (err) {
      return res
        .status(500)
        .send("Issue retrieving all wall tasks, server error");
    }
  });

  app.post(
    "/api/task/edit",
    requireJwt,
    async (req: Request<{}, any, TaskType>, res) => {
      const { task, dueDate, enabledDueDate, onTaskWall } = req.body;
      assertRequestWithUser(req);

      let updatedUserPublicTasks;

      const publicTask = await PublicTaskList.findOne<PublicTaskListType>({
        _user: req.user?._id,
        tasks: { $elemMatch: { taskId: req.body.taskId } },
      })
        .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
        .exec();

      try {
        await TaskList.findOneAndUpdate<TaskListType>(
          {
            _user: req.user?._id,
            "tasks.taskId": req.body.taskId,
          },
          {
            "tasks.$.task": task,
            "tasks.$.dueDate": enabledDueDate ? dueDate : null,
            "tasks.$.enabledDueDate": enabledDueDate,
            "tasks.$.onTaskWall": onTaskWall,
          }
        ).exec();
      } catch (err) {
        res.status(500).send("Issue editing task, try again");
      }

      if (publicTask && !onTaskWall) {
        const totalTasks = await PublicTaskList.findOne<PublicTaskListType>({
          _user: req.user?._id,
        })
          .select(["totalTasks", "-_id"])
          .exec();

        if (totalTasks?.totalTasks === 1) {
          try {
            await PublicTaskList.findOneAndDelete<PublicTaskListType>({
              _user: req.user?._id,
            }).exec();

            updatedUserPublicTasks = null;
          } catch (err) {
            res
              .status(500)
              .send("Edited task but unable to delete task wall task");
          }
        } else {
          try {
            await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
              { _user: req.user?._id },
              {
                $pull: { tasks: { taskId: req.body.taskId } },
                $inc: { totalTasks: -1 },
              }
            ).exec();
          } catch (err) {
            res
              .status(500)
              .send("Edited task but unable to delete task wall task");
          } finally {
            const tasks = await PublicTaskList.findOne<PublicTaskListType>({
              _user: req.user?._id,
            })
              .select(["tasks", "-_id"])
              .exec();

            updatedUserPublicTasks = tasks?.tasks.map((task) => task);
          }
        }
      }

      if (publicTask && onTaskWall) {
        try {
          await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
            {
              _user: req.user?._id,
              "tasks.taskId": req.body.taskId,
            },
            {
              "tasks.$.task": task,
              "tasks.$.dueDate": enabledDueDate ? dueDate : null,
              "tasks.$.enabledDueDate": enabledDueDate,
              "tasks.$.onTaskWall": onTaskWall,
            }
          ).exec();
        } catch (err) {
          res.status(500).send("Unable to update task wall task, try again");
        } finally {
          const tasks = await PublicTaskList.findOne<PublicTaskListType>({
            _user: req.user?._id,
          })
            .select(["tasks", "-_id"])
            .exec();

          updatedUserPublicTasks = tasks?.tasks.map((task) => task);
        }
      } else if (!publicTask && onTaskWall) {
        const totalTasks = await PublicTaskList.findOne<PublicTaskListType>({
          _user: req.user?._id,
        })
          .select(["-_id", "totalTasks"])
          .exec();

        const publicTask = new PublicTask<PublicTaskType>({
          user: req.user as ValidUserType,
          created: new Date().toISOString(),
          dueDate,
          enabledDueDate,
          task,
          taskId: req.body.taskId,
        });

        if (!totalTasks?.totalTasks || totalTasks.totalTasks === 0) {
          try {
            const taskList = await new PublicTaskList({
              _user: req.user._id,
              tasks: [publicTask],
              totalTasks: 1,
            }).save();

            updatedUserPublicTasks = taskList.tasks;
          } catch (err) {
            res
              .status(500)
              .send("Edited task but unable add task to task wall");
          }
        } else {
          try {
            await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
              { _user: req.user?._id },
              {
                $push: { tasks: publicTask },
                $inc: { totalTasks: 1 },
              }
            ).exec();
          } catch (err) {
            res
              .status(500)
              .send("Edited task but unable add task to task wall");
          } finally {
            const tasks = await PublicTaskList.findOne<PublicTaskListType>({
              _user: req.user?._id,
            })
              .select(["tasks", "-_id"])
              .exec();

            updatedUserPublicTasks = tasks?.tasks.map((task) => task);
          }
        }
      }

      const tasks = await TaskList.findOne({ _user: req.user?._id })
        .select("tasks")
        .exec();

      const userTasks = tasks?.tasks.map((task) => task);

      res.send([userTasks, updatedUserPublicTasks, false]);
    }
  );

  app.post(
    "/api/task/complete",
    requireJwt,
    async (req: Request<{}, any, { taskId: TaskType["taskId"] }>, res) => {
      const publicTask = await PublicTaskList.findOne({
        _user: req.user?._id,
        "tasks.taskId": req.body.taskId,
      })
        .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
        .exec();

      let updatedUserTasks;
      let updatedUserPublicTasks;

      try {
        await TaskList.findOneAndUpdate(
          {
            _user: req.user?._id,
          },
          { $set: { "tasks.$[task].complete": true } },
          { arrayFilters: [{ "task.taskId": req.body.taskId }] }
        ).exec();

        const tasks = await TaskList.findOne({
          _user: req.user?._id,
        })
          .select("tasks")
          .exec();

        updatedUserTasks = tasks?.tasks.map((task) => task);
      } catch (err) {
        return res
          .status(500)
          .send("Unable to set task as complete, try again");
      }

      if (publicTask) {
        try {
          await PublicTaskList.findOneAndUpdate(
            {
              _user: req.user?._id,
            },
            { $set: { "tasks.$[task].complete": true } },
            { arrayFilters: [{ "task.taskId": req.body.taskId }] }
          ).exec();

          const publicTasks = await PublicTaskList.findOne({
            _user: req.user?._id,
          })
            .select("tasks")
            .exec();

          updatedUserPublicTasks = publicTasks?.tasks.map((task) => task);
        } catch (err) {
          return res
            .status(500)
            .send("Unable to set task wall task as complete, try again");
        }
      }

      res.send([
        updatedUserTasks || false,
        updatedUserPublicTasks || false,
        false,
      ]);
    }
  );

  app.post(
    "/api/task",
    requireJwt,
    async (req: Request<{}, any, TaskTypeIncoming>, res) => {
      assertRequestWithUser(req);

      const newTask = new Task<TaskType>({
        ...req.body,
        created: new Date().toISOString(),
        taskId: crypto.randomUUID().toString(),
      });

      const taskList = await TaskList.findOne<TaskListType>({
        _user: req.user?._id,
      }).exec();

      let updatedUserTasks;
      let updatedUserPublicTasks;

      if (taskList) {
        try {
          await TaskList.findOneAndUpdate<TaskListType>(
            { _user: req.user?._id },
            { $push: { tasks: newTask }, $inc: { totalTasks: 1 } }
          ).exec();
        } catch (err) {
          return res.status(500).send("Unable to update task list, try again");
        } finally {
          const tasks = await TaskList.findOne<TaskListType>({
            _user: req.user?._id,
          })
            .select("tasks")
            .exec();

          updatedUserTasks = tasks?.tasks.map((task) => task);
        }
      } else {
        try {
          const tasks = await new TaskList({
            _user: req.user?._id,
            tasks: [newTask],
            totalTasks: 1,
          }).save();

          updatedUserTasks = tasks?.tasks.map((task) => task);
        } catch (err) {
          return res.status(500).send("Unable to create new task, try again");
        }
      }

      if (newTask.onTaskWall) {
        const publicTaskList = await PublicTaskList.findOne<PublicTaskListType>(
          {
            _user: req.user?._id,
          }
        ).exec();

        const { created, dueDate, enabledDueDate, task, taskId } = newTask;

        const publicTask = new PublicTask<PublicTaskType>({
          user: req.user,
          created,
          dueDate,
          enabledDueDate,
          task,
          taskId,
        });

        if (publicTaskList) {
          try {
            await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
              { _user: req.user?._id },
              { $push: { tasks: publicTask }, $inc: { totalTasks: 1 } }
            ).exec();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your first task to task wall, try again");
          } finally {
            const tasks = await PublicTaskList.findOne<PublicTaskListType>({
              _user: req.user?._id,
            })
              .select("tasks")
              .exec();

            updatedUserPublicTasks = tasks?.tasks.map((task) => task);
          }
        } else {
          try {
            await new PublicTaskList({
              _user: req.user?._id,
              tasks: [publicTask],
              totalTasks: 1,
            }).save();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your task to task wall, try again");
          } finally {
            const tasks = await PublicTaskList.findOne({
              _user: req.user?._id,
            })
              .select("tasks")
              .exec();

            updatedUserPublicTasks = tasks?.tasks.map((task) => task);
          }
        }
      }

      const publicTasks = await PublicTaskList.find({
        totalTasks: { $gt: 0 },
      })
        .select("tasks")
        .exec();

      let allPublicTasks: PublicTaskType[] = [];

      publicTasks.forEach(({ tasks }) => {
        return allPublicTasks.push(...tasks);
      });

      res.send([
        updatedUserTasks || false,
        updatedUserPublicTasks || false,
        allPublicTasks || false,
      ]);
    }
  );

  app.delete(
    "/api/task",
    requireJwt,
    async (req: Request<{}, any, { taskId: TaskType["taskId"] }>, res) => {
      let updatedUserTasks;
      let updatedUserPublicTasks;

      const userWallTasks = await PublicTaskList.findOne({
        _user: req.user?._id,
      }).exec();

      updatedUserPublicTasks = userWallTasks?.tasks.map((task) => task);

      const tasks = await TaskList.findOne<TaskListType>({
        _user: req.user?._id,
      })
        .select("totalTasks")
        .exec();

      const publicTasks = await PublicTaskList.findOne<PublicTaskListType>({
        _user: req.user?._id,
      })
        .select("totalTasks")
        .exec();

      const matchingPublicTask =
        await PublicTaskList.findOne<PublicTaskListType>({
          _user: req.user?._id,
          tasks: { $elemMatch: { taskId: req.body.taskId } },
        })
          .select({ tasks: { $elemMatch: { taskId: req.body.taskId } } })
          .exec();

      if (tasks?.totalTasks && tasks.totalTasks > 1) {
        try {
          await TaskList.findOneAndUpdate<TaskListType>(
            { _user: req.user?._id },
            {
              $pull: { tasks: { taskId: req.body.taskId } },
              $inc: { totalTasks: -1 },
            }
          ).exec();

          const tasks = await TaskList.findOne({ _user: req.user?._id })
            .select("tasks")
            .exec();

          updatedUserTasks = tasks?.tasks.map((task) => task);
        } catch (err) {
          return res.status(500).send("Unable to delete task, try again");
        }
      }

      if (tasks?.totalTasks && tasks.totalTasks === 1) {
        try {
          await TaskList.findOneAndDelete<TaskListType>({
            _user: req.user?._id,
          }).exec();

          updatedUserTasks = null;
        } catch (err) {
          return res.status(500).send("Unable to delete task, try again");
        }
      }

      if (publicTasks && publicTasks.totalTasks > 1 && matchingPublicTask) {
        try {
          await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
            { _user: req.user?._id },
            {
              $pull: { tasks: { taskId: req.body.taskId } },
              $inc: { totalTasks: -1 },
            }
          ).exec();

          const tasks = await PublicTaskList.findOne({ _user: req.user?._id });

          updatedUserPublicTasks = tasks?.tasks.map((task) => task);
        } catch (err) {
          return res
            .status(500)
            .send("Unable to delete task from Task Wall, try again");
        }
      }

      if (publicTasks && publicTasks.totalTasks === 1 && matchingPublicTask) {
        try {
          await PublicTaskList.findOneAndDelete<TaskListType>({
            _user: req.user?._id,
          }).exec();

          updatedUserPublicTasks = null;
        } catch (err) {
          return res
            .status(500)
            .send("Unable to delete task from Task Wall, try again");
        }
      }

      res.send([updatedUserTasks, updatedUserPublicTasks, false]);
    }
  );
};

export default taskRoutes;
