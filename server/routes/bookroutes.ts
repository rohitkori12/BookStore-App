import express from 'express';

const bookRoutes = express.Router(); 

import bookController from '../controllers/book';

// URL : bookApi/getBooks/
bookRoutes.get('/getBooks',bookController.getBooks);

// URL : bookApi/addBook/
bookRoutes.post('/addBook',bookController.addBook);

// URL : bookApi/updateBook/
bookRoutes.put('/updateBook',bookController.updateBook);

// URL : bookApi/deleteBook/
bookRoutes.delete('/deleteBook',bookController.deleteBook);


export default bookRoutes;
