import { Express, Request } from "express";
import { model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { PublicTaskListType } from "../models/PublicTaskList";
import { TaskListType, TaskType, TaskTypeIncoming } from "../models/TaskList";

const TaskList = model<TaskListType>("taskList");
const PublicTaskList = model<PublicTaskListType>("publicTaskList");

const taskRoutes = (app: Express) => {
  app.post(
    "/api/new_task",
    requireJwt,
    async (req: Request<{}, any, TaskTypeIncoming>, res) => {
      const newTask = {
        ...req.body,
        created: new Date().toISOString(),
        taskId: "kih3y73h",
      };

      const taskList = await TaskList.findOne({ _user: req.user?._id });

      let updatedTaskList;

      if (taskList) {
        try {
          updatedTaskList = await TaskList.findOneAndUpdate(
            {},
            { $push: { tasks: newTask } }
          );
        } catch (err) {
          res.status(500).send("Unable to update task list, try again");
        }
      } else {
        try {
          updatedTaskList = await new TaskList({
            _user: req.user?._id,
            tasks: [newTask],
          }).save();
        } catch (err) {
          res.status(500).send("Unable to create task list, try again");
        }
      }

      if (newTask.onTaskWall) {
        const publicTaskList = await PublicTaskList.findOne({
          _user: req.user?._id,
        });

        if (publicTaskList) {
          try {
            
          } catch (err) {

          }
        }
      }
    }
  );
};

export default taskRoutes;
