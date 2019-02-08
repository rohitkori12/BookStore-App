"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../models/book"));
const addBook = (req, res, next) => {
    const name = req.body.name;
    const author = req.body.author;
    const cost = req.body.cost;
    const pages = req.body.pages;
    const book = new book_1.default(name, author, cost, pages);
    book.save()
        .then((result) => {
        return res.json({ "Inserted": 1, "Message": "Book Inserted Successfully" });
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
};
const getBooks = (req, res, next) => {
    book_1.default.fetchAllBooks()
        .then((books) => {
        return res.json(books);
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
};
const updateBook = (req, res) => {
    const { _id, name, author, cost, pages } = req.body;
    let book = new book_1.default(name, author, cost, pages);
    book_1.default.updateBook(_id, book)
        .then((result) => {
        return res.json({ "Updated": 1, "Message": "Book Updated Succesfully" });
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
};
const deleteBook = (req, res) => {
    const { _id } = req.body;
    book_1.default.deleteBook(_id)
        .then((result) => {
        return res.json({ "Updated": 1, "Message": "Book Deleted Succesfully" });
    })
        .catch((err) => {
        console.log(err);
        return err;
    });
};
exports.default = {
    addBook: addBook,
    getBooks: getBooks,
    updateBook: updateBook,
    deleteBook: deleteBook
};
//# sourceMappingURL=book.js.map