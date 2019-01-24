import express from 'express';
import http from 'http';

const app = express();
const ip = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, ip, () => {
    console.log(`Listening on port ${port}`);
});

