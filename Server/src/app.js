import '@babel/polyfill';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './database.js';
import controller from './controllers/memeController.js';

const app = express();
// const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

connectDb();

app.use(cors());
app.use(bodyParser.json());

app.get('/all', controller.getAll);
app.post('/add', controller.add);
app.delete('/remove', controller.delete);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

