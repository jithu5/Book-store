import express from 'express';
import { createBooks, getBooks } from "../controller/book-controller.js";
import { upload } from '../middlewares/multer.middleware.js';

const bookRoute = express.Router();

// Create a new book
bookRoute.post("/create-book",upload.single('coverImage'),createBooks)

// get all books 
bookRoute.get("/get-books",getBooks)


export default bookRoute;