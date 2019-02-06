const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Rohit:QSf8oZ8VbyaKGQI1@cluster0-gss9d.mongodb.net/book?retryWrites=true',
    { useNewUrlParser: true })
        .then(client => {
            console.log("Connected Successfully");
            db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        })
};

const getDb = ()=> {
    if(db)
        return db;
    else
        throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;