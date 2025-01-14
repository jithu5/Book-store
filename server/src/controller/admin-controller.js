import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AdminModel from '../models/admin.model.js';

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