const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookroutes');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use('/book',bookRoutes);

mongoConnect(()=> {
    app.listen(8080, function () {
        console.log('server running in port 8080');
    })
});
