import express, { urlencoded, json } from 'express';
import { randomUUID } from 'crypto';

const app = express();

app.use(urlencoded());
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/upload', (req, res) => {
    console.log('Data chunks received', req.body);
    setTimeout(() => {
        res.send({
            event: 'upload',
            id: randomUUID()
        });
    }, 500);
});

app.listen(9000, () => {
    console.log('Server running at http://localhost:9000');
});
