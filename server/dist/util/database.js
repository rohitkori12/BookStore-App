"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongodb = require('mongodb');
const mongodb_1 = __importDefault(require("mongodb"));
const MongoClient = mongodb_1.default.MongoClient;
let db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Rohit:QSf8oZ8VbyaKGQI1@cluster0-gss9d.mongodb.net/book?retryWrites=true', { useNewUrlParser: true })
        .then(client => {
        console.log("Connected Successfully");
        db = client.db();
        callback();
    })
        .catch(err => {
        console.log(err);
    });
};
const getDb = (name) => {
    if (db)
        return db;
    else
        throw 'No Database Found';
};
exports.default = {
    mongoConnect: mongoConnect,
    getDb: getDb
};
//# sourceMappingURL=database.js.map