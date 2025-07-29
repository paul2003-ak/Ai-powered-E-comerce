import express from "express";
import { addproduct, listproduct, removeproduct,  } from "../controller/product.controller.js";
import upload from "../middleware/multer.js";
import { adminauth } from "../middleware/adminauth.js";
const router = express.Router();

router.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1}
]),addproduct);

router.get("/alllist",listproduct);
router.post("/removeproduct/:id", adminauth, removeproduct);

 
export default router;