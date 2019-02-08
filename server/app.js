"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var bookroutes_1 = require("./routes/bookroutes");
var database_1 = require("./util/database");
var app = express_1["default"]();
app.use(body_parser_1["default"].json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use('/bookApi', bookroutes_1["default"]);
database_1["default"].mongoConnect(function () {
    app.listen(8080, function () {
        console.log('server running in port 8080');
    });
});
