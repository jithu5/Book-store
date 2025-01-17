import express from 'express';
import { getCartBooks, Login, Logout, signUp,addToCart } from '../controller/user-controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get("/cart",authMiddleware,getCartBooks)

// User registration route
userRouter.post('/register',signUp)

userRouter.post('/login',Login)

userRouter.post('/logout',authMiddleware,Logout)

userRouter.post('/add-cart/:bookId', authMiddleware, addToCart);


export default userRouter;