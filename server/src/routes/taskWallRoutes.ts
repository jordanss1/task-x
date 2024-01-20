import { assert } from "console";
import { Express, Request } from "express";
import { HydratedDocument, UpdateQuery, model } from "mongoose";
import requireJwt from "../middlewares/requireJwt";
import { CommentType, commentSchema } from "../models/Comment";
import { PublicTaskListType, PublicTaskType } from "../models/PublicTaskList";
import { TaskType } from "../models/TaskList";
import { ValidUserType } from "../models/User";
import {
  AwardType,
  EditCommentRequestType,
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
      const data = await PublicTaskList.findOne({ _user: req.user._user })
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

  app.patch(
    "/api/task_wall",
    requireJwt,
    async (req: Request<any, {}, ValidUserType["profile"]>, res) => {
      assertRequestWithUser<ValidUserType["profile"]>(req);

      const { _user, profile } = req.user as ValidUserType;

      try {
        await PublicTaskList.updateMany(
          {},
          {
            $set: {
              "tasks.$[commentUser].user.profilePicture":
                profile.profilePicture,
              "tasks.$[commentUser].user.userName": profile.userName,
              "tasks.$[commentUser].user.nameLowerCase":
                profile.userName.toLowerCase(),
              "tasks.$[].likes.users.$[user].userName": profile.userName,
              "tasks.$[].likes.users.$[user].nameLowerCase":
                profile.userName.toLowerCase(),
              "tasks.$[].likes.users.$[user].profilePicture":
                profile.profilePicture,
              "tasks.$[].comments.$[commentUser].user.profilePicture":
                profile.profilePicture,
              "tasks.$[].comments.$[commentUser].user.userName":
                profile.userName,
              "tasks.$[].comments.$[commentUser].user.nameLowerCase":
                profile.userName.toLowerCase(),
              "tasks.$[].comments.$[].likes.users.$[user].profilePicture":
                profile.profilePicture,
              "tasks.$[].comments.$[].likes.users.$[user].userName":
                profile.userName,
              "tasks.$[].comments.$[].likes.users.$[user].nameLowerCase":
                profile.userName.toLowerCase(),
            },
          },
          {
            arrayFilters: [
              { "user._user": _user },
              { "commentUser.user._user": _user },
            ],
          }
        ).exec();

        const publicTasks = await PublicTaskList.find({
          totalTasks: { $gt: 0 },
        })
          .select(["tasks", "-_id"])
          .exec();

        let allPublicTasks: PublicTaskType[] = [];

        publicTasks.forEach(({ tasks }) => {
          return allPublicTasks.push(...tasks);
        });

        const userTasks = allPublicTasks.filter(
          ({ user }) => user._user === _user
        );

        res.send([allPublicTasks || false, userTasks || false]);
      } catch (err) {
        console.log(err);
        res.status(500).send("Problem");
      }
    }
  );

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
        user: req.user.profile as ValidUserType["profile"],
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

  app.patch(
    "/api/task_wall/comment",
    requireJwt,
    async (req: Request<any, {}, EditCommentRequestType>, res) => {
      const { comment, _id, taskId } = req.body;

      if (!comment.length || comment.length > 80) {
        res.status(400).send("Comment does not meet required length");
        return;
      }

      try {
        const newComment =
          await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
            { tasks: { $elemMatch: { taskId } } },
            {
              $set: { "tasks.$[task].comments.$[comment].comment": comment },
            },
            {
              new: true,
              arrayFilters: [{ "task.taskId": taskId }, { "comment._id": _id }],
            }
          )
            .select({ tasks: { $elemMatch: { taskId } } })
            .exec();

        const updatedComment = newComment?.tasks[0]?.comments?.find(
          (comment) => comment.id === _id
        );

        res.send({ comment: updatedComment, taskId });
      } catch (err) {
        res.status(500).send("Error editing comment, try again");
      }
    }
  );

  app.delete(
    "/api/task_wall/comment",
    requireJwt,
    async (
      req: Request<any, {}, Omit<EditCommentRequestType, "comment">>,
      res
    ) => {
      const { _id, taskId } = req.body;

      try {
        const task = await PublicTaskList.findOneAndUpdate<PublicTaskListType>(
          { tasks: { $elemMatch: { taskId } } },
          {
            $pull: { "tasks.$[task].comments": { _id: { _id } } },
          },
          {
            new: true,
            arrayFilters: [{ "task.taskId": taskId }],
          }
        )
          .select({ tasks: { $elemMatch: { taskId } } })
          .exec();

        const comments = task?.tasks[0]?.comments;

        res.send({ comments, taskId });
      } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting comment, try again");
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
