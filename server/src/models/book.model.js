import mongoose from 'mongoose';
import { type } from 'os';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 300,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        trending: {
            type: Boolean,
            default: false,
        },
        coverImage: {
            type: String, // cloud url
            required: true,
            trim: true,
        },
        oldPrice: {
            type: Number,
            required: true,
            trim: true,
        },
        newPrice: {
            type: Number,
            required: true,
            trim: true,
        },
        author:{
            type:String
        }
    },
    { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
