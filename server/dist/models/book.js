"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
const mongodb_1 = __importDefault(require("mongodb"));
class Book {
    constructor(name, author, cost, pages) {
        this.name = name;
        this.author = author;
        this.cost = cost;
        this.pages = pages;
    }
    save() {
        const db = database_1.default.getDb('book');
        return db.collection('books').insertOne(this)
            .then((result) => {
            console.log(result);
        });
    }
    static fetchAllBooks() {
        const db = database_1.default.getDb('book');
        return db.collection('books')
            .find()
            .toArray()
            .then((books) => {
            return books;
        });
    }
    static updateBook(_id, book) {
        const db = database_1.default.getDb('book');
        return db.collection('books')
            .findOneAndUpdate({ _id: new mongodb_1.default.ObjectId(_id) }, {
            $set: {
                name: book.name,
                author: book.author,
                cost: book.cost,
                pages: book.pages
            }
        });
    }
    static deleteBook(_id) {
        const db = database_1.default.getDb('book');
        return db.collection('books')
            .deleteOne({ _id: new mongodb_1.default.ObjectId(_id) });
    }
}
exports.default = Book;
//# sourceMappingURL=book.js.map