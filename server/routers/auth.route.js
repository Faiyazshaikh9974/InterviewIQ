import express from "express"
import { authUser, logOutUser } from "../controller/auth.controller.js";

export const Authrouter = express.Router();



Authrouter.post('/google', authUser);

Authrouter.get("/logout", logOutUser)