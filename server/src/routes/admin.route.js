import express from 'express';
import { createAdmin, getAdminBookAndClient, getAdminBooks, loginAdmin } from '../controller/admin-controller.js';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware.js';
const AdminRouter = express.Router();

AdminRouter.post("/register",createAdmin)

AdminRouter.post("/login",loginAdmin)

AdminRouter.get("/book-users",adminAuthMiddleware,getAdminBookAndClient)

AdminRouter.get("/",adminAuthMiddleware,getAdminBooks)

export default AdminRouter;