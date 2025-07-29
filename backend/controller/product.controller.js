import { uploadoncloudinary } from "../config/cloudinary.js";
import productmodel from "../model/product.model.js";

//Add Product
export const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;
        const img1 = await uploadoncloudinary(req.files.image1[0].path);
        const img2 = await uploadoncloudinary(req.files.image2[0].path);
        const img3 = await uploadoncloudinary(req.files.image3[0].path);
        const img4 = await uploadoncloudinary(req.files.image4[0].path);

        const prouctdata = {
            name,
            image1: img1,
            image2: img2,
            image3: img3,
            image4: img4,
            description,
            price: Number(price),
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            date: Date.now(),
            bestseller: bestseller === 'true' ? true : false
        }
        const product = await productmodel.create(prouctdata);
        return res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: `Error in addproduct: ${error.message}` });
        console.log(`Error in addproduct: ${error.message}`);
    }
}

//list product

export const listproduct = async (req, res) => {
    try {
        const product = await productmodel.find({})
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: `Error in list: ${error.message}` });
        console.log(`Error in list: ${error.message}`);
    }
}

//remove product
export const removeproduct=async(req,res)=>{
    try{
        const {id}=req.params;
        const product = await productmodel.findByIdAndDelete(id);
        return res.status(200).json(product);
    }catch(error){
        res.status(500).json({ message: `Error in deleteproduct: ${error.message}` });
        console.log(`Error in deleteproduct: ${error.message}`);
    }
}
