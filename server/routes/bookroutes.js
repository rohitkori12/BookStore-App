var express = require('express');

var bookRoutes = express.Router(); 

var bookController = require('../controllers/book');

// URL : book/getBooks/
bookRoutes.get('/getBooks',bookController.getBooks);

// URL : book/addBook/
bookRoutes.post('/addBook',bookController.addBook);


module.exports = bookRoutes;
