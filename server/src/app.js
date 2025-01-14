import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "dotenv/config";
import {fileURLToPath} from "url"
import path, {dirname} from "path"
import morgan from "morgan"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import routes
import bookRoute from './routes/book.route.js';
import userRouter from './routes/user.route.js';
import AdminRouter from './routes/admin.route.js';

const app = express();


// Middleware setup
app.use(
    cors({
        origin: process.env.CLIENT_URI,
        credentials: true,
    })
);

app.use(morgan('dev')); // Logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
app.use('/api/books', bookRoute);
app.use('/api/users', userRouter);
app.use('/api/admin',AdminRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    const errMsg = err.message || "something went wrong";
    const statusCode = err.statusCode || 500;
    const errors = err.errors || [];
    const success = err.success || false;
    res.status(statusCode).json({ message: errMsg, errors: errors,success: success });
}); 


export default app;