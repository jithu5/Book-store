import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";

const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.adminToken;
        console.log("admin token found ", token);

        if (!token) {
            throw new ApiError(401, "No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new ApiError(403, "Unauthorized access");
        }
        req.admin = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        throw new ApiError(error.stausCode, error.message);
    }
};

export default adminAuthMiddleware;