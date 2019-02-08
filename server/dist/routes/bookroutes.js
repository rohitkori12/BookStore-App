"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRoutes = express_1.default.Router();
const book_1 = __importDefault(require("../controllers/book"));
// URL : bookApi/getBooks/
bookRoutes.get('/getBooks', book_1.default.getBooks);
// URL : bookApi/addBook/
bookRoutes.post('/addBook', book_1.default.addBook);
// URL : bookApi/updateBook/
bookRoutes.put('/updateBook', book_1.default.updateBook);
// URL : bookApi/deleteBook/
bookRoutes.delete('/deleteBook', book_1.default.deleteBook);
exports.default = bookRoutes;
//# sourceMappingURL=bookroutes.js.map