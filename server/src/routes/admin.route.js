import express from 'express';
import { createAdmin, loginAdmin } from '../controller/admin-controller.js';
const AdminRouter = express.Router();

AdminRouter.post("/register",createAdmin)

AdminRouter.post("/login",loginAdmin)


export default AdminRouter;