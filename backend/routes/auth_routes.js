import express from "express";
import { checkAuth, forgotPassword, Login, Logout, resetPassword, Signup, Verifyemail } from "../controller/auth_controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.post('/logout', Logout);
authRouter.post(`/verifyemail`, Verifyemail);
authRouter.post(`/forgot-password`, forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.get('/check-auth', verifyToken, checkAuth);



export default authRouter;

