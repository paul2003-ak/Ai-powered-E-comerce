import express from "express";
import { isAuth } from "../middleware/Isauth.js";
import { addtocart, getUsercart, updateCart } from "../controller/cartcontroller.js";

const routes=express.Router();

routes.post('/addtocart',isAuth,addtocart);
routes.post('/updatecart',isAuth,updateCart);
routes.get('/getall',isAuth,getUsercart);


export default routes;