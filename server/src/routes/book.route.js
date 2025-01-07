import express from 'express';
import { addToCart, createBooks, deleteBook, deleteCartitem, getBookById, getBooks, updateBook } from "../controller/book-controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

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

// add to cart
bookRoute.post("/add-cart/:bookId",authMiddleware, addToCart)

bookRoute.delete('/remove-cart/:cartItemId', authMiddleware, deleteCartitem);


export default bookRoute;