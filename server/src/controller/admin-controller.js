import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AdminModel from '../models/admin.model.js';
import mongoose from 'mongoose';

export const createAdmin = AsyncHandler(async (req, res) => {
    const { username, email, password,secret } = req.body;
    if (!username || !email || !password || !secret) {
        throw new ApiError(400, 'All fields are required');
    }
    try {
        const adminSecret = process.env.ADMIN_SECRET;
        if (secret !== adminSecret ) {
            throw new ApiError(404,"You do not have permission to access this")
        }
        const admin = await AdminModel.findOne({
            $or: [{ username: username, email: email }],
        });
        if (admin) {
            throw new ApiError(400, 'Admin already exists');
        }
        const newAdmin = await AdminModel.create({ username, email, password });

        const token = await newAdmin.generateAccessToken();

        res.status(201)
            .cookie('adminToken', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hour
                httpOnly: true,
                secure: false, // set to true for HTTPS only
                sameSite: 'lax', // Options: 'strict', 'lax', 'none'
            })
            .json(new ApiResponse(newAdmin));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});


export const loginAdmin = AsyncHandler(async (req, res) => {
    console.log("enter Admin Login");
    const { email, password, secret} = req.body;
    if (!email ||!password) {
        throw new ApiError(400, 'All fields are required');
    }
    try {
        const adminSecret = process.env.ADMIN_SECRET;
        console.log(adminSecret);
        console.log(secret);
        if (secret !== adminSecret) {
            throw new ApiError(
                404,
                'You do not have permission to access this'
            );
        }
        
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            throw new ApiError(404, 'Admin not found');
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, 'Invalid credentials');
        }
        const token = await admin.generateAccessToken();
        res.status(200)
        .cookie('adminToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 hour
            httpOnly: true,
            secure: false, // set to true for HTTPS only
            sameSite: 'lax', // Options: 'strict', 'lax', 'none'
        })
        .json(new ApiResponse(200, admin, 'Admin logged in successfully'));
    }
        catch(error){
            console.log(error)
            throw new ApiError(error.statusCode, error.message)
        }
});

 export const logoutAdmin = AsyncHandler(async (req, res) => {
    res.clearCookie('adminToken', { path: '/' });
    return res.json(new ApiResponse(200, 1, 'Admin logged out successfully'));
})

export const getAdminBookAndClient = AsyncHandler(async(req,res)=>{
    const adminId = req.admin
    console.log("Admin id: " + adminId)
    try {
       
         const createdBooks = await AdminModel.aggregate([
             { $match: { _id: new mongoose.Types.ObjectId(String(adminId)) } }, // Match admin by ID
             {
                 $lookup: {
                     from: 'books',
                     localField: 'username',
                     foreignField: 'author', // Matching by author ID
                     as: 'Books',
                 },
             },
             {
                 $unwind: '$Books', // Unwind the books array to process each book separately
             },
             {
                 $lookup: {
                     from: 'carts',
                     localField: 'Books._id', // Matching books by their _id
                     foreignField: 'bookId',
                     as: 'User',
                 },
             },
             {
                 $unwind: '$User', // Unwind the User array to get individual user data
             },
             {
                 $lookup: {
                     from: 'users',
                     localField: 'User.userId', // Lookup user details by user ID
                     foreignField: '_id',
                     as: 'userData',
                 },
             },
             {
                 $unwind: '$userData', // Unwind the userData array to get individual user details
             },

             {
                 $group: {
                     _id: '$Books._id', // Group by book _id to ensure each book appears only once
                     title: { $first: '$Books.title' },
                     authorName: { $first: '$Books.author' },
                     description: { $first: '$Books.description' },
                     newPrice: { $first: '$Books.newPrice' },
                     oldPrice: { $first: '$Books.oldPrice' },
                     users: { $addToSet: '$userData.username' },
                     trending: { $first: '$Books.trending' },
                     coverImage: { $first: '$Books.coverImage' },
                     // Collect unique users who borrowed t
                 },
             },

             {
                 $project: {
                     title: 1,
                     authorName: 1,
                     description: 1,
                     newPrice: 1,
                     oldPrice: 1,
                     trending: 1,
                     users: 1,
                     coverImage: 1,
                     // Create new fields for user count and average rating
                 },
             },
         ]);
         
         return res.json(
         new ApiResponse(200, createdBooks, 'Books fetched successfully')
         );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
})

export const getAdminBooks = AsyncHandler(async(req, res)=>{
    const adminId = req.admin
    console.log("Admin id: " + adminId)
    try {
        const adminBooks = await AdminModel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(String(adminId)) },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'username',
                    foreignField: 'author',
                    as: 'Books',
                },
            },
            {
                $unwind: '$Books',
            },
            {
                $project:{
                    title: "$Books.title",
                    author: "$Books.author",
                    description: "$Books.description",
                    newPrice: '$Books.newPrice',
                    oldPrice: "$Books.oldPrice",
                    trending: "$Books.trending",
                    coverImage: "$Books.coverImage",
                    category: "$Books.category",
                    _id: "$Books._id",
                    // Create new fields for user count and average rating
                }
            }
        ])
        if (!adminBooks) {
            throw new ApiError(404,"Admin books not found")
        }
        res.json(new ApiResponse(200,adminBooks,"Fetched admin books successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(error.statusCode,error.message);
    }
})

export const getAdmin = AsyncHandler(async(req, res)=>{
    const adminId = req.admin
    try {
        const admin = await AdminModel.findById(adminId)
        if (!admin) {
            throw new ApiError(404,"Admin not found")
        }
        res.json(new ApiResponse(200,admin,"Fetched admin successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(error.statusCode,error.message);
    }
})