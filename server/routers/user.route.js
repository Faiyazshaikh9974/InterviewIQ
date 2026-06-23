import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controller/user.controller.js";


export const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrentUser);