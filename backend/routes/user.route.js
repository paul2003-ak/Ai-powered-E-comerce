import express from "express";
import { adminlogin, GoogleLogIn, login, logout, register } from "../controller/auth.controller.js";

const router=express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.post("/googlelogin",GoogleLogIn)

//ADMIN PART
router.post("/adminlogin",adminlogin)

export default router;