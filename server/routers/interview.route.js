import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { analyzeResume } from "../controller/interview.controller.js";

export const interviewRouter = express.Router();

interviewRouter.post("/resume", upload.single("resume"), analyzeResume);
