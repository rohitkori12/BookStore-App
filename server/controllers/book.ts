import Book from '../models/book';

const addBook = (req:any,res:any,next:any)=>{
    const name = req.body.name;
    const author = req.body.author;
    const cost = req.body.cost;
    const pages = req.body.pages;

    const book = new Book(name,author,cost,pages);
    
    book.save()
    .then((result:any)=>{
        return res.json({"Inserted":1,"Message":"Book Inserted Successfully"});
    })
    .catch((err:any)=>{
        console.log(err);
        return err;
    });
}

const getBooks =(req:any,res:any,next:any)=>{
    Book.fetchAllBooks()
    .then((books:any)=>{
        return res.json(books);
    })
    .catch((err:any)=>{
        console.log(err);
        return err;
    });
};

const updateBook = (req:any,res:any)=>{
    const {_id,name,author,cost,pages} = req.body;
    let book = new Book(name,author,cost,pages)
    
    Book.updateBook(_id,book)
    .then((result:any)=>{
        return res.json({"Updated":1,"Message":"Book Updated Succesfully"});
    })
    .catch((err:any)=>{
        console.log(err);
        return err;
    });
};

const deleteBook = (req:any,res:any)=>{
    const {_id } = req.body;
    
    Book.deleteBook(_id)
    .then((result:any)=>{
        return res.json({"Updated":1,"Message":"Book Deleted Succesfully"});
    })
    .catch((err:any)=>{
        console.log(err);
        return err;
    });
};


export default {
    addBook : addBook,
    getBooks: getBooks,
    updateBook : updateBook,
    deleteBook : deleteBook
}