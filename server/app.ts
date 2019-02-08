import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookroutes';

import database from './util/database';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use('/bookApi',bookRoutes);

database.mongoConnect(()=> {
    app.listen(8080, function () {
        console.log('server running in port 8080');
    })
});
