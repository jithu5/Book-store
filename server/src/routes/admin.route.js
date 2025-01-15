import express from 'express';
import { createAdmin, getAdminData, loginAdmin } from '../controller/admin-controller.js';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware.js';
const AdminRouter = express.Router();

AdminRouter.post("/register",createAdmin)

AdminRouter.post("/login",loginAdmin)

AdminRouter.get("/",adminAuthMiddleware,getAdminData)

export default AdminRouter;