import '@babel/polyfill';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './database.js';
import MemeController from './controllers/MemeController.js';
import UserController from './controllers/UserController.js';

const app = express();
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

connectDb();

app.use(cors());
app.use(bodyParser.json());

const memeControllerInstance = new MemeController;

app.get('/memes', memeControllerInstance.getAll);
app.get('/memes/:id', memeControllerInstance.getById);
app.post('/memes', memeControllerInstance.add);
app.delete('/memes', memeControllerInstance.delete);
app.put('/memes', memeControllerInstance.update);

// app.get('/login', UserController.login);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

