import { Express, Request } from 'express';
import { model } from 'mongoose';
import requireJwt from '../middlewares/requireJwt';
import { NotificationsType } from '../models/Notifications';
import { PublicTaskListType } from '../models/PublicTaskList';
import { assertRequestWithUser } from '../types';

const Notifications = model<NotificationsType>('notifications');
const PublicTaskList = model<PublicTaskListType>('publicTaskList');

const notificationsRoutes = (app: Express) => {
  app.get('/api/notifications', requireJwt, async (req, res) => {
    assertRequestWithUser(req);

    try {
      const notifications = await Notifications.findOne<NotificationsType>({
        _user: req.user._user,
      }).exec();

      const awardNotifications = notifications?.awardNotifications || [];

      const userTaskLikes =
        notifications?.userTaskLikes?.filter(
          ({ total }) => total && total > 0
        ) || [];

      const userTaskComments =
        notifications?.userTaskComments?.filter(
          ({ total }) => total && total > 0
        ) || [];

      const commentLikes =
        notifications?.commentLikes?.filter(
          ({ total }) => total && total > 0
        ) || [];

      res.send([
        awardNotifications,
        userTaskLikes,
        userTaskComments,
        commentLikes,
      ]);
    } catch (err) {
      res.status(500).send('Unable to retrieve notifications right now');
    }
  });

  app.patch(
    '/api/notifications',
    requireJwt,
    async (req: Request<any, {}, { taskId: string }>, res) => {
      assertRequestWithUser<{ taskId: string }>(req);

      try {
        await Notifications.findOneAndUpdate<NotificationsType>(
          {
            _user: req.user._user,
          },
          {
            $set: {
              'awardNotifications.$[noti].unseen': false,
              'userTaskLikes.$[noti].unseen': false,
              'userTaskComments.$[noti].unseen': false,
              'commentLikes.$[noti].unseen': false,
            },
          },
          { arrayFilters: [{ 'noti.taskId': req.body.taskId }] }
        ).exec();

        res.send();
      } catch (err) {
        res.status(500).send('Unable to retrieve task, try again');
      }
    }
  );
};

export default notificationsRoutes;
