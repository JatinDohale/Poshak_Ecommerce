import express from 'express'

import { userLogin, userSignUp, adminLogin } from '../controllers/userController.js'


const userRouter = express.Router(); //Make Router

// Routes
userRouter.post("/login", userLogin);
userRouter.post("/signup", userSignUp);
userRouter.post("/adminlogin", adminLogin);

export default userRouter;
