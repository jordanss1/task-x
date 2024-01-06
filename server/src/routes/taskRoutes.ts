import * as crypto from "crypto";
import { Express, Request } from "express";
import { model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { PublicTaskListType, PublicTaskType } from "../models/PublicTaskList";
import { TaskListType, TaskType, TaskTypeIncoming } from "../models/TaskList";
import { ValidUserType } from "../models/User";

const Task = model<TaskType>("task");
const TaskList = model<TaskListType>("taskList");
const PublicTask = model<PublicTaskType>("publicTask");
const PublicTaskList = model<PublicTaskListType>("publicTaskList");

const taskRoutes = (app: Express) => {
  app.get("/api/user_tasks", requireJwt, async (req, res) => {
    try {
      const data = await TaskList.findOne({ _user: req.user?._id })
        .select("tasks")
        .exec();

      return res.send(data ? data.tasks.map((task) => task) : false);
    } catch (err) {
      return res.status(500).send("Issue retrieving task list, server error");
    }
  });

  app.get("/api/user_wall_tasks", requireJwt, async (req, res) => {
    try {
      const data = await PublicTaskList.findOne({ _user: req.user?._id })
        .select("tasks")
        .exec();

      return res.send(data ? data.tasks.map((task) => task) : false);
    } catch (err) {
      return res
        .status(500)
        .send("Issue retrieving task wall tasks, server error");
    }
  });

  app.get("/api/wall_tasks", requireJwt, async (req, res) => {
    try {
      const publicTasks = await PublicTaskList.find({
        totalTasks: { $gt: 0 },
      })
        .select("tasks")
        .exec();

      const allPublicTasks = publicTasks.map(({ tasks }) => {
        return tasks.reduce((task) => task);
      });

      return res.send(allPublicTasks || false);
    } catch (err) {
      return res
        .status(500)
        .send("Issue retrieving all wall tasks, server error");
    }
  });

  app.post(
    "/api/new_task",
    requireJwt,
    async (req: Request<{}, any, TaskTypeIncoming>, res) => {
      const newTask = new Task<TaskType>({
        ...req.body,
        created: new Date().toISOString(),
        taskId: crypto.randomUUID().toString(),
      });

      const taskList = await TaskList.findOne({ _user: req.user?._id }).exec();

      let updatedUserTasks;
      let updatedUserPublicTasks;

      if (taskList) {
        try {
          await TaskList.findOneAndUpdate(
            { _user: req.user?._id },
            { $push: { tasks: newTask } }
          ).exec();
        } catch (err) {
          return res.status(500).send("Unable to update task list, try again");
        } finally {
          const tasks = await TaskList.findOne({
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
          user: req.user as ValidUserType,
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
              { $push: { tasks: publicTask, $inc: { totalTasks: 1 } } }
            ).exec();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your first task to task wall, try again");
          } finally {
            const tasks = await PublicTaskList.findOne({
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
              $inc: { totalTasks: 1 },
            }).save();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your task to task wall, try again");
          } finally {
            updatedUserPublicTasks = await PublicTaskList.findOne({
              _user: req.user?._id,
            })
              .select("tasks")
              .exec();
          }
        }
      }

      const publicTasks = await PublicTaskList.find({
        totalTasks: { $gt: 0 },
      })
        .select("tasks")
        .exec();

      const allPublicTasks = publicTasks.map(({ tasks }) => {
        return tasks.reduce((task) => task);
      });

      res.send([
        updatedUserTasks || false,
        updatedUserPublicTasks || false,
        allPublicTasks || false,
      ]);
    }
  );

  app.delete(
    "/api/delete_task",
    requireJwt,
    async (req: Request<{}, any, TaskType>, res) => {
      let updatedUserTasks;
      let updatedUserPublicTasks;

      // try {
      //   await TaskList.findOneAndDelete<TaskListType>(
      //     { _user: req.user?._id },
      //     { $pull: { tasks: { taskId: req.body.taskId } } }
      //   ).exec();

      //   const tasks = await TaskList.findById(req.user?._id).select("tasks");

      //   updatedUserTasks = tasks?.tasks.map((task) => task);
      // } catch (err) {
      //   return res.status(500).send("Unable to delete task, try again");
      // }

      // console.log(updatedUserTasks);

      res.send([updatedUserTasks, updatedUserPublicTasks || false, false]);
    }
  );
};

export default taskRoutes;
