import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authUser } from "./controller/auth.controller.js";
import { Authrouter } from "./routers/auth.route.js";
import { userRouter } from "./routers/user.route.js";
import { interviewRouter } from "./routers/interview.route.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allows your specific frontend origin
    credentials: true, // Corrected: lowercase 'c' and plural 's'
  }),
);
app.use(cookieParser());
app.use(express.json());


//routes 
app.use("/api/auth", Authrouter);
app.use("/api/user", userRouter )
app.use("/api/interview", interviewRouter )


const port = process.env.PORT;
app.listen(port, () => {
  connectDb();
  console.log("Server is running on" + " " + port);
});
