import express from 'express';
import http from 'http';

const app = express();
const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, ip, () => {
    console.log(`Listening on port ${port}`);
});

