"use strict";
exports.__esModule = true;
// const mongodb = require('mongodb');
var mongodb_1 = require("mongodb");
var MongoClient = mongodb_1["default"].MongoClient;
var db;
var mongoConnect = function (callback) {
    MongoClient.connect('mongodb+srv://Rohit:QSf8oZ8VbyaKGQI1@cluster0-gss9d.mongodb.net/book?retryWrites=true', { useNewUrlParser: true })
        .then(function (client) {
        console.log("Connected Successfully");
        db = client.db();
        callback();
    })["catch"](function (err) {
        console.log(err);
    });
};
var getDb = function (name) {
    if (db)
        return db;
    else
        throw 'No Database Found';
};
exports["default"] = {
    mongoConnect: mongoConnect,
    getDb: getDb
};
