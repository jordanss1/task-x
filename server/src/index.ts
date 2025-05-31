import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import { connect } from 'mongoose';
import path from 'path';
import keys from './config/keys';
import getCookies from './middlewares/getCookies';
import redirectToClient from './middlewares/redirectToClient';
import './models/Notifications';
import './models/PublicTaskList';
import './models/TaskList';
import './models/User';
import assetsRoutes from './routes/assetsRoutes';
import googleAuthRoutes from './routes/authRoutes';
import notificationsRoutes from './routes/notificationsRoutes';
import taskListRoutes from './routes/taskListRoutes';
import taskWallRoutes from './routes/taskWallRoutes';
import './services/passport';
import types from './types/express';

const { mongoURI } = keys;

connect(mongoURI);

const app: Express = express();

app.use('/api', express.static('src/public'));

console.log(`Running Node.js version: ${process.version}`);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src-elem': [
          'https://task-x.onrender.com',
          'https://fontawesome.com',
          'https://kit.fontawesome.com/b3cd848b13.js',
          'https://ka-f.fontawesome.com',
          'https://*.google.com',
          'https://accounts.google.com/gsi/client',
        ],
        'default-src': [
          'https://task-x.onrender.com',
          'https://fontawesome.com',
          'https://kit.fontawesome.com/b3cd848b13.js',
          'https://ka-f.fontawesome.com',
          'https://*.google.com',
          'https://accounts.google.com/gsi/client',
        ],
      },
    },
  })
);

app.use(bodyParser.json());

app.use(getCookies);

if (process.env.NODE_ENV !== 'production') {
  redirectToClient(app);
}

googleAuthRoutes(app);

assetsRoutes(app);

taskListRoutes(app);

taskWallRoutes(app);

notificationsRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
