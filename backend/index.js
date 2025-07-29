import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import { connecttodb } from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

import userroute from "./routes/user.route.js"
import authrouter from "./routes/auth.routes.js";
import productrouter from "./routes/product.route.js";  
import cartrouter from './routes/cart.routes.js'
import orderouter from './routes/Order.routes.js'
import aichat from './routes/ai.routes.js'


const PORT=process.env.PORT || 6000;

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["https://ai-powered-e-comerce-frontend-one.onrender.com" , "http://localhost:5174"],
    credentials:true
}))

app.use("/api/auth",userroute)
app.use("/api/isauth",authrouter)
app.use("/api/product",productrouter)
app.use("/api/cart",cartrouter)
app.use('/api/order',orderouter)
app.use('/api/ai',aichat)

app.listen(PORT,()=>{
    connecttodb()
    console.log("running...")
})
