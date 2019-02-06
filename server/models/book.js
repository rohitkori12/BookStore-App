const getDb = require('../util/database').getDb;

class Book{
    constructor(name,author,cost,pages){
        this.name = name;
        this.author = author;
        this.cost = cost;
        this.pages = pages;
    }

    save(){
        const db = getDb('book');
        return db.collection('books').insertOne(this)
        .then((result)=>{
                console.log(result);
        })
        .catch((err)=>{
                console.log(err);
        });
    }

    static fetchAllBooks(){
        const db = getDb('book');
        return db.collection('books')
                .find()
                .toArray()
                .then((books)=>{
                    return books;
                })
                .catch((err)=>{
                    console.log(err);
                });
    }
}

module.exports = Book;
