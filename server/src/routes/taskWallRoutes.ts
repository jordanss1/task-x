import { Express, Request } from "express";
import { UpdateQuery, model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { CommentType } from "../models/Comment";
import { PublicTaskListType, PublicTaskType } from "../models/PublicTaskList";
import { TaskType } from "../models/TaskList";
import { ValidUserType } from "../models/User";
import {
  AwardType,
  LikeCommentRequestType,
  LikeTaskRequestType,
  NewCommentRequestType,
  assertRequestWithUser,
} from "../types";

const PublicTaskList = model<PublicTaskListType>("publicTaskList");
const Comment = model<CommentType>("comment");

const taskWallRoutes = (app: Express) => {
  app.get("/api/task_wall/user", requireJwt, async (req, res) => {
    assertRequestWithUser(req);

    try {
      const data = await PublicTaskList.findOne({ _user: req.user._id })
        .select("tasks")
        .exec();

      res.send(data ? data.tasks.map((task) => task) : false);
      return;
    } catch (err) {
      res
        .status(500)
        .send("Issue retrieving user task wall tasks, server error");
      return;
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

      res.send(allPublicTasks || false);
    } catch (err) {
      res.status(500).send("Issue retrieving all wall tasks, server error");
    }
  });

  app.post(
    "/api/task_wall/comment",
    requireJwt,
    async (req: Request<any, {}, NewCommentRequestType>, res) => {
      assertRequestWithUser<NewCommentRequestType>(req);

      const { comment, taskId } = req.body;

      if (!comment.length || comment.length > 80) {
        res.status(400).send("Comment does not meet required length");
        return;
      }

      const newComment = new Comment<CommentType>({
        comment,
        user: req.user,
        created: new Date().toISOString(),
      });

      try {
        await PublicTaskList.findOneAndUpdate(
          {
            tasks: { $elemMatch: { taskId } },
          },
          {
            $push: { "tasks.$[task].comments": newComment },
          },
          { arrayFilters: [{ "task.taskId": taskId }] }
        )
          .select({ tasks: { $elemMatch: { taskId } } })
          .exec();

        res.send({ comment: newComment, taskId });
      } catch (err) {
        res.status(500).send("Error adding comment, try again");
      }
    }
  );

  app.post(
    "/api/task_wall/task/like",
    requireJwt,
    async (req: Request<{}, any, LikeTaskRequestType>, res) => {
      assertRequestWithUser<LikeTaskRequestType>(req);

      const { previousLikes, currentAwards, liked, taskId } = req.body;

      let awardArray = currentAwards?.length ? currentAwards : [];

      if (!liked) {
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

      const updateQuery: UpdateQuery<PublicTaskListType> = liked
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
            .select({ tasks: { $elemMatch: { taskId } } })
            .exec();

        res.send(likedTask?.tasks[0]);
      } catch (err) {
        res.status(500).send("Problem liking task, try again");
      }
    }
  );

  app.post(
    "/api/task_wall/comment/like",
    requireJwt,
    async (req: Request<{}, any, LikeCommentRequestType>, res) => {
      assertRequestWithUser<LikeCommentRequestType>(req);

      const { liked, _id, taskId } = req.body;

      const updateQuery: UpdateQuery<PublicTaskListType> = liked
        ? {
            $inc: { "tasks.$[task].comments.$[comment].likes.likes": -1 },
            $pull: {
              "tasks.$[task].comments.$[comment].likes.users": req.user.profile,
            },
          }
        : {
            $inc: { "tasks.$[task].comments.$[comment].likes.likes": 1 },
            $push: {
              "tasks.$[task].comments.$[comment].likes.users": req.user.profile,
            },
          };

      try {
        const comment = await PublicTaskList.findOneAndUpdate(
          {
            tasks: { $elemMatch: { taskId } },
          },
          updateQuery,
          {
            arrayFilters: [{ "task.taskId": taskId }, { "comment._id": _id }],
            new: true,
          }
        )
          .select({ tasks: { $elemMatch: { taskId } } })
          .exec();

        const updatedComment = comment?.tasks[0]?.comments?.find(
          (comment) => comment.id === _id
        );

        res.send({ comment: updatedComment, taskId });
      } catch (err) {
        res.status(500).send("Error liking comment, try again");
      }
    }
  );
};

export default taskWallRoutes;
