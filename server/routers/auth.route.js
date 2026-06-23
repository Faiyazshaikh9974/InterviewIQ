import express from "express"
import { authUser } from "../controller/auth.controller.js";

const Authrouter = express.Router();



Authrouter.post('/google', authUser);