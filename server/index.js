import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.js";

dotenv.config();
const app = express()


const port = process.env.PORT 


app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Server is running fine"
    })
})

app.listen(port, ()=>{
    connectDb()
    console.log("Server is running on" + " " + port)
})