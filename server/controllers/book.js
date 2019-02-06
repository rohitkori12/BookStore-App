const Book = require('../models/book');

exports.addBook = (req,res,next)=>{
    const name = req.body.name;
    const author = req.body.author;
    const cost = req.body.cost;
    const pages = req.body.pages;

    const book = new Book(name,author,cost,pages);
    
    book.save()
    .then((result)=>{
        return res.json({"Inserted":1,"Message":"Book Inserted Successfully"});
    })
    .catch((err)=>{
        console.log(err);
    });
}

exports.getBooks =(req,res,next)=>{
    Book.fetchAllBooks()
    .then((books)=>{
        return res.json(books);
    })
    .catch((err)=>{
        console.log(err);
    });
};