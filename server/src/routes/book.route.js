import express from 'express';
import { createBooks, deleteBook, getBookById, getBooks, updateBook } from "../controller/book-controller.js";
import { upload } from '../middlewares/multer.middleware.js';

const bookRoute = express.Router();

// Create a new book
bookRoute.post("/create-book",upload.single('coverImage'),createBooks)

// get all books 
bookRoute.get("/",getBooks)

// get book by bookId

bookRoute.get('/:bookId', getBookById);

// update book
bookRoute.put("/edit/:bookId",updateBook)

// delete book
bookRoute.delete("/delete/:bookId",deleteBook)

export default bookRoute;