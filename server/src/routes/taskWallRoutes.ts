import { Express, Request } from "express";
import { UpdateQuery, model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { PublicTaskListType, PublicTaskType } from "../models/PublicTaskList";
import { TaskType } from "../models/TaskList";
import { assertRequestWithUser } from "../types";

const PublicTaskList = model<PublicTaskListType>("publicTaskList");

type LikeRequestType = {
  previousLikes: number;
  currentlyLiked: boolean;
  currentAwards: PublicTaskType["awards"];
  taskId: PublicTaskType["taskId"];
};

export type AwardType = "supported" | "superSupported" | "communityLegend";

const taskWallRoutes = (app: Express) => {
  app.get("/api/task_wall/user", requireJwt, async (req, res) => {
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

  app.get("/api/task_wall/all", requireJwt, async (req, res) => {
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
    "/api/task_wall/like/task",
    requireJwt,
    async (req: Request<{}, any, LikeRequestType>, res) => {
      assertRequestWithUser<LikeRequestType>(req);

      const { previousLikes, currentAwards, currentlyLiked, taskId } = req.body;

      let awardArray = currentAwards?.length ? currentAwards : [];

      if (!currentlyLiked) {
        const newAward: AwardType | null =
          previousLikes === 24
            ? "supported"
            : previousLikes === 49
            ? "superSupported"
            : previousLikes === 99
            ? "communityLegend"
            : null;

        if (newAward && !awardArray.includes(newAward)) {
          awardArray.push(newAward);
        }
      }

      const updateQuery: UpdateQuery<PublicTaskListType> = currentlyLiked
        ? {
            $inc: { "tasks.$[task].likes.likes": -1 },
            $pull: {
              "tasks.$[task].likes.users": {
                userName: req.user.profile?.userName,
              },
            },
          }
        : {
            $inc: { "tasks.$[task].likes.likes": 1 },
            $push: {
              "tasks.$[task].likes.users": req.user.profile,
            },
          };

      try {
        const likedTask =
          await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
            {
              tasks: { $elemMatch: { taskId } },
            },
            {
              $set: { "tasks.$[task].awards": awardArray },
              ...updateQuery,
            },
            { arrayFilters: [{ "task.taskId": taskId }], new: true }
          )
            .select(["-_id", "tasks"])
            .exec();

        res.send(likedTask?.tasks[0]);
      } catch (err) {
        res.status(500).send("Problem liking task, try again");
      }
    }
  );

  app.post("/api/task_wall/like/comment", requireJwt, async (req, res) => {});
};

export default taskWallRoutes;
