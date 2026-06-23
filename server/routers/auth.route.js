import express from "express"
import { authUser } from "../controller/auth.controller.js";

export const Authrouter = express.Router();



Authrouter.post('/google', authUser);