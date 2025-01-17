import express from 'express';
import {  createBooks, deleteBook, deleteCartitem, getBookById, getBooks, updateBook } from "../controller/book-controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware.js';

const bookRoute = express.Router();

// Create a new book
bookRoute.post("/create-book",adminAuthMiddleware,upload.single('coverImage'),createBooks)

// get all books 
bookRoute.get("/",getBooks)


// get book by bookId

bookRoute.get('/:bookId',authMiddleware, getBookById);

// update book
bookRoute.put(
    '/edit/:bookId',
    adminAuthMiddleware,
    upload.single('coverImage'),
    updateBook
);

// delete book
bookRoute.delete("/delete/:bookId",adminAuthMiddleware,deleteBook)


bookRoute.delete('/remove-cart/:cartItemId', authMiddleware, deleteCartitem);


export default bookRoute;