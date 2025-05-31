"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requireJwt_1 = __importDefault(require("../middlewares/requireJwt"));
const types_1 = require("../types");
const PublicTaskList = (0, mongoose_1.model)('publicTaskList');
const Notifications = (0, mongoose_1.model)('notifications');
const CommentNotification = (0, mongoose_1.model)('commentNotification');
const AwardNotification = (0, mongoose_1.model)('awardNotification');
const Comment = (0, mongoose_1.model)('comment');
const taskWallRoutes = (app) => {
    app.get('/api/task_wall/user', requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        try {
            const data = await PublicTaskList.findOne({ _user: req.user._user })
                .select('tasks')
                .exec();
            res.send(data ? data.tasks.map((task) => task) : false);
            return;
        }
        catch (err) {
            res
                .status(500)
                .send('Issue retrieving user task wall tasks, server error');
            return;
        }
    });
    app.get('/api/task_wall/all', requireJwt_1.default, async (req, res) => {
        try {
            const publicTasks = await PublicTaskList.find({
                totalTasks: { $gt: 0 },
            })
                .select(['tasks', '-_id'])
                .exec();
            let allPublicTasks = [];
            publicTasks.forEach(({ tasks }) => {
                return allPublicTasks.push(...tasks);
            });
            res.send(allPublicTasks.length > 0 ? allPublicTasks : false);
        }
        catch (err) {
            res.status(500).send('Issue retrieving all wall tasks, server error');
        }
    });
    app.patch('/api/task_wall', requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { _user, profile } = req.user;
        try {
            await PublicTaskList.updateMany({}, {
                $set: {
                    'tasks.$[deepUser].user.profilePicture': profile.profilePicture,
                    'tasks.$[deepUser].user.userName': profile.userName,
                    'tasks.$[deepUser].user.nameLowerCase': profile.userName.toLowerCase(),
                    'tasks.$[].likes.users.$[user].userName': profile.userName,
                    'tasks.$[].likes.users.$[user].nameLowerCase': profile.userName.toLowerCase(),
                    'tasks.$[].likes.users.$[user].profilePicture': profile.profilePicture,
                    'tasks.$[].comments.$[deepUser].user.profilePicture': profile.profilePicture,
                    'tasks.$[].comments.$[deepUser].user.userName': profile.userName,
                    'tasks.$[].comments.$[deepUser].user.nameLowerCase': profile.userName.toLowerCase(),
                    'tasks.$[].comments.$[].likes.users.$[user].profilePicture': profile.profilePicture,
                    'tasks.$[].comments.$[].likes.users.$[user].userName': profile.userName,
                    'tasks.$[].comments.$[].likes.users.$[user].nameLowerCase': profile.userName.toLowerCase(),
                },
            }, {
                arrayFilters: [
                    { 'user._user': _user },
                    { 'deepUser.user._user': _user },
                ],
            }).exec();
            const publicTasks = await PublicTaskList.find({
                totalTasks: { $gt: 0 },
            })
                .select(['tasks', '-_id'])
                .exec();
            let allPublicTasks = [];
            publicTasks.forEach(({ tasks }) => {
                return allPublicTasks.push(...tasks);
            });
            const userTasks = allPublicTasks.filter(({ user }) => user._user === _user);
            res.send([allPublicTasks || false, userTasks || false]);
        }
        catch (err) {
            res.status(500).send('Problem');
        }
    });
    app.post('/api/task_wall/comment', requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { comment, taskId } = req.body;
        if (!comment.length || comment.length > 80) {
            res.status(400).send('Comment does not meet required length');
            return;
        }
        const publicTask = await PublicTaskList.findOne({
            tasks: { $elemMatch: { taskId } },
        })
            .select({
            tasks: { $elemMatch: { taskId } },
        })
            .exec();
        const userCommentNotification = await Notifications.findOne({
            userTaskComments: { $elemMatch: { taskId } },
        })
            .select('_user')
            .exec();
        const ownUserCommentOnOwnTask = userCommentNotification?._user === req.user._user;
        const newComment = new Comment({
            comment,
            user: req.user.profile,
            created: new Date().toISOString(),
        });
        const newCommentLikeNotification = new CommentNotification({
            taskId,
            commentId: newComment.id,
            task: publicTask?.tasks[0]?.task,
            type: 'commentLike',
        });
        try {
            await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, {
                $push: { 'tasks.$[task].comments': newComment },
            }, { arrayFilters: [{ 'task.taskId': taskId }] })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            await Notifications.findOneAndUpdate({ _user: req.user._user }, {
                $push: { commentLikes: newCommentLikeNotification },
            }).exec();
            if (!ownUserCommentOnOwnTask) {
                await Notifications.findOneAndUpdate({
                    _user: publicTask?.tasks[0]?.user._user,
                }, {
                    $inc: {
                        'userTaskComments.$[task].total': 1,
                    },
                    $set: {
                        'userTaskComments.$[task].unseen': true,
                        'userTaskComments.$[task].created': new Date().toISOString(),
                    },
                }, { arrayFilters: [{ 'task.taskId': taskId }] }).exec();
            }
            res.send({ comment: newComment, taskId });
        }
        catch (err) {
            res.status(500).send('Error adding comment, try again');
        }
    });
    app.patch('/api/task_wall/comment', requireJwt_1.default, async (req, res) => {
        const { comment, _id, taskId } = req.body;
        if (!comment.length || comment.length > 80) {
            res.status(400).send('Comment does not meet required length');
            return;
        }
        try {
            const newComment = await PublicTaskList.findOneAndUpdate({ tasks: { $elemMatch: { taskId } } }, {
                $set: { 'tasks.$[task].comments.$[comment].comment': comment },
            }, {
                new: true,
                arrayFilters: [{ 'task.taskId': taskId }, { 'comment._id': _id }],
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const updatedComment = newComment?.tasks[0]?.comments?.find((comment) => comment.id === _id);
            res.send({ comment: updatedComment, taskId });
        }
        catch (err) {
            res.status(500).send('Error editing comment, try again');
        }
    });
    app.delete('/api/task_wall/comment', requireJwt_1.default, async (req, res) => {
        const { _id, taskId } = req.body;
        try {
            const task = await PublicTaskList.findOneAndUpdate({ tasks: { $elemMatch: { taskId } } }, {
                $pull: { 'tasks.$[task].comments': { _id: { _id } } },
            }, {
                new: true,
                arrayFilters: [{ 'task.taskId': taskId }],
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const comments = task?.tasks[0]?.comments;
            res.send({ comments, taskId });
        }
        catch (err) {
            res.status(500).send('Error deleting comment, try again');
        }
    });
    app.post('/api/task_wall/task/like', requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { previousLikes, currentAwards, liked, taskId } = req.body;
        let awardArray = currentAwards?.length ? currentAwards : [];
        const userLikeNotification = await Notifications.findOne({
            userTaskLikes: { $elemMatch: { taskId } },
        })
            .select(['_user', 'userTaskLikes'])
            .exec();
        const ownUserTask = userLikeNotification?._user === req.user._user;
        const filteredUserLikeNotification = userLikeNotification?.userTaskLikes?.filter((notification) => notification.taskId === taskId)[0];
        const userHasLiked = filteredUserLikeNotification?.users?.some((user) => user === req.user._user);
        if (!liked) {
            const newAward = previousLikes === 24
                ? 'supported'
                : previousLikes === 49
                    ? 'superSupported'
                    : previousLikes === 99
                        ? 'communityLegend'
                        : null;
            if (newAward && !awardArray.includes(newAward)) {
                awardArray.push(newAward);
                const awardNotification = new AwardNotification({
                    taskId,
                    task: filteredUserLikeNotification?.task,
                    award: newAward,
                    created: new Date().toISOString(),
                    unseen: true,
                });
                await Notifications.findOneAndUpdate({
                    _user: userLikeNotification?._user,
                }, {
                    $push: {
                        awardNotifications: awardNotification,
                    },
                }).exec();
            }
        }
        const updateQuery = liked
            ? {
                $inc: { 'tasks.$[task].likes.likes': -1 },
                $pull: {
                    'tasks.$[task].likes.users': {
                        userName: req.user.profile?.userName,
                    },
                },
            }
            : {
                $inc: { 'tasks.$[task].likes.likes': 1 },
                $push: {
                    'tasks.$[task].likes.users': req.user.profile,
                },
            };
        try {
            const likedTask = await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, {
                $set: { 'tasks.$[task].awards': awardArray },
                ...updateQuery,
            }, { arrayFilters: [{ 'task.taskId': taskId }], new: true })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            if (!userHasLiked && !ownUserTask) {
                await Notifications.findOneAndUpdate({
                    _user: userLikeNotification?._user,
                }, {
                    $push: {
                        'userTaskLikes.$[task].users': req.user._user,
                    },
                    $inc: {
                        'userTaskLikes.$[task].total': 1,
                    },
                    $set: {
                        'userTaskLikes.$[task].unseen': true,
                        'userTaskLikes.$[task].created': new Date().toISOString(),
                    },
                }, { arrayFilters: [{ 'task.taskId': taskId }] }).exec();
            }
            res.send(likedTask?.tasks[0]);
        }
        catch (err) {
            res.status(500).send('Problem liking task, try again');
        }
    });
    app.post('/api/task_wall/comment/like', requireJwt_1.default, async (req, res) => {
        (0, types_1.assertRequestWithUser)(req);
        const { liked, _id, taskId } = req.body;
        const updateQuery = liked
            ? {
                $inc: { 'tasks.$[task].comments.$[comment].likes.likes': -1 },
                $pull: {
                    'tasks.$[task].comments.$[comment].likes.users': req.user.profile,
                },
            }
            : {
                $inc: { 'tasks.$[task].comments.$[comment].likes.likes': 1 },
                $push: {
                    'tasks.$[task].comments.$[comment].likes.users': req.user.profile,
                },
            };
        const commentLikeNotifications = await Notifications.findOne({
            commentLikes: { $elemMatch: { commentId: _id } },
        })
            .select(['_user', 'commentLikes'])
            .exec();
        const ownUsersComment = commentLikeNotifications?._user === req.user._user;
        const filteredCommentLikeNotification = commentLikeNotifications?.commentLikes?.filter((notification) => notification.commentId === _id)[0];
        const userHasLiked = filteredCommentLikeNotification?.users?.some((user) => user === req.user._user);
        try {
            const comment = await PublicTaskList.findOneAndUpdate({
                tasks: { $elemMatch: { taskId } },
            }, updateQuery, {
                arrayFilters: [{ 'task.taskId': taskId }, { 'comment._id': _id }],
                new: true,
            })
                .select({ tasks: { $elemMatch: { taskId } } })
                .exec();
            const updatedComment = comment?.tasks[0]?.comments?.find((comment) => comment.id === _id);
            if (!userHasLiked && !ownUsersComment) {
                await Notifications.findOneAndUpdate({
                    _user: commentLikeNotifications?._user,
                }, {
                    $push: {
                        'commentLikes.$[comment].users': req.user._user,
                    },
                    $inc: {
                        'commentLikes.$[comment].total': 1,
                    },
                    $set: {
                        'commentLikes.$[comment].unseen': true,
                        'commentLikes.$[comment].created': new Date().toISOString(),
                    },
                }, { arrayFilters: [{ 'comment.commentId': _id }] }).exec();
            }
            res.send({ comment: updatedComment, taskId });
        }
        catch (err) {
            res.status(500).send('Error liking comment, try again');
        }
    });
};
exports.default = taskWallRoutes;
