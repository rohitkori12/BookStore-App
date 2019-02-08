import database from '../util/database';
import mongodb from 'mongodb';

class Book{
    name:string;
    author:string;
    cost:number;
    pages:number;

    constructor(name:string,author:string,cost:number,pages:number){
        this.name = name;
        this.author = author;
        this.cost = cost;
        this.pages = pages;
    }

    save(){
        const db = database.getDb('book');
        return db.collection('books').insertOne(this)
        .then((result:any)=>{
                console.log(result);
        });
    }

    static fetchAllBooks(){
        const db = database.getDb('book');
        return db.collection('books')
                .find()
                .toArray()
                .then((books:any)=>{
                    return books;
                })
    }

    static updateBook(_id:any,book:Book){
        const db = database.getDb('book');
        return db.collection('books')
        .findOneAndUpdate({_id:new mongodb.ObjectId(_id)},{
            $set:{
                name:book.name,
                author:book.author,
                cost:book.cost,
                pages:book.pages
            }
        });
    }

    static deleteBook(_id:any){
        const db = database.getDb('book');
        return db.collection('books')
        .deleteOne({_id: new mongodb.ObjectId(_id)});
    }
}

export default Book;
