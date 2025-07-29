import express from "express";
import { getcurrAdmin, getcurruser } from "../controller/middleware.auth.controller.js";
import { isAuth } from "../middleware/Isauth.js";
import { adminauth } from "../middleware/adminauth.js";

const authrouter=express.Router();

authrouter.get("/getcurruser",isAuth,getcurruser)
authrouter.get("/getcurradin",adminauth,getcurrAdmin)


export default authrouter