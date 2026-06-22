import mongoose from "mongoose";


export async function connectDb(){
    try {
        await mongoose.connect(process.env.DB_URL, )
        console.log("Database connected")
    } catch (error) {
        console.log("Faild to connect Database" , error)
    }
    
    }
