import express from 'express';
import { createAdmin, getAdmin, getAdminBookAndClient, getAdminBooks, loginAdmin, logoutAdmin } from '../controller/admin-controller.js';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware.js';
const AdminRouter = express.Router();

AdminRouter.post("/register",createAdmin)

AdminRouter.post("/login",loginAdmin)

AdminRouter.get("/book-users",adminAuthMiddleware,getAdminBookAndClient)

AdminRouter.get("/books",adminAuthMiddleware,getAdminBooks)

AdminRouter.get("/",adminAuthMiddleware,getAdmin)

AdminRouter.post("/logout",adminAuthMiddleware,logoutAdmin)

export default AdminRouter;