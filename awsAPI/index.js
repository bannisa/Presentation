import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';

const PORT = 6100;

const app = express();

app.use(bodyParser.json());

routes.forEach(route => {
    app[route.method](route.path,route.handler);
});

const start = async () => {
    app.listen(PORT, ()=> {console.log("Server is up and running")});
}

start();