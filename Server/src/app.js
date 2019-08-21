import '@babel/polyfill';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './database.js';
import MemeController from './controllers/MemeController';
import UserController from './controllers/UserController';
import AuthMiddleware from './middleware/auth';
import PermissionsMiddleware from './middleware/permissions';

const app = express();
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

connectDb();

app.use(cors());
app.use(bodyParser.json());

const memeControllerInstance = new MemeController;
const permissionsMiddlewareInstance = new PermissionsMiddleware;

app.get('/memes', memeControllerInstance.getAll);
app.get('/memes/:id', memeControllerInstance.getById);
app.post('/memes', AuthMiddleware, permissionsMiddlewareInstance.check('MEMES_ADD'), memeControllerInstance.add);
app.delete('/memes', AuthMiddleware, permissionsMiddlewareInstance.check('MEMES_DELETE'), memeControllerInstance.delete);
app.put('/memes', AuthMiddleware, permissionsMiddlewareInstance.check('MEMES_UPDATE'), memeControllerInstance.update);

const userControllerInstance = new UserController;

app.post('/register', AuthMiddleware, userControllerInstance.register);
app.post('/login', userControllerInstance.login);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

