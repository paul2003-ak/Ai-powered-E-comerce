import express from "express";
import { isAuth } from "../middleware/Isauth.js";
import {adminauth} from '../middleware/adminauth.js'
import { allorder, placeorder, placeorderrazorpay, updatestatus, userorders, verifyrazorpay } from "../controller/order.controller.js";

const router=express.Router();

router.post('/placeorder',isAuth,placeorder);
router.get('/userorder',isAuth,userorders);

//for Razorpay
router.post('/razorpay',isAuth,placeorderrazorpay );
router.post('/verifyrazorpay',isAuth,verifyrazorpay );


//for admin
router.get('/allorder', adminauth , allorder );
router.post('/updatestatus',adminauth,updatestatus );
 
export default router;