import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
let db:any;

const mongoConnect = (callback:any) => {
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

const getDb = (name:any)=> {
    if(db)
        return db;
    else
        throw 'No Database Found';
}

export default {
    mongoConnect:mongoConnect,
    getDb: getDb
}