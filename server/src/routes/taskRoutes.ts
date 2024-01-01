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

      let updatedTaskList;
      let updatedPublicTaskList;

      if (taskList) {
        try {
          updatedTaskList = await TaskList.findOneAndUpdate(
            { _user: req.user?._id },
            { $push: { tasks: newTask } }
          ).exec();
        } catch (err) {
          return res.status(500).send("Unable to update task list, try again");
        }
      } else {
        try {
          updatedTaskList = await new TaskList({
            _user: req.user?._id,
            tasks: [newTask],
          }).save();
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
            updatedPublicTaskList =
              await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
                { _user: req.user?._id },
                { $push: { tasks: publicTask } }
              ).exec();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your first task to task wall, try again");
          }
        } else {
          try {
            updatedPublicTaskList = await new PublicTaskList({
              _user: req.user?._id,
              tasks: [publicTask],
            }).save();
          } catch (err) {
            return res
              .status(500)
              .send("Unable to add your task to task wall, try again");
          }
        }
      }

      res.send([updatedTaskList, updatedPublicTaskList || false]);
    }
  );
};

export default taskRoutes;
