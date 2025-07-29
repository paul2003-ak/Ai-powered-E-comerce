import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


export const uploadoncloudinary=async(filepath)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET  
    })
    try{
        if(!filepath){
            return null;
        }
        const uploadresult=await cloudinary.uploader.upload(filepath)
        fs.unlinkSync(filepath); // Delete the file after upload
        return uploadresult.secure_url; // Return the secure URL of the uploaded image
    }catch(error){
        fs.unlinkSync(filepath); // Delete the file in case of error
        console.log(`Error uploading to Cloudinary: ${error.message}`);
    }
}