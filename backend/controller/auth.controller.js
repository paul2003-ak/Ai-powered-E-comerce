import validator from "validator";
import usermodel from "../model/user.model.js";
import { gettokenforadmin } from "../config/admittoken.js";

export const register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const existuser=await usermodel.findOne({email})
        if(existuser){
            return res.status(400).json({message:"user already exist"});
        }
        if(!validator.isEmail(email)){//it is for varify email valid or not email
            return res.status(400).json({message:"Enter Valid email"});
        }

        if(password.length < 8){
            return res.status(400).json({message:"password minimum 8 charecters"});
        }

        const hashpassword=await usermodel.hashpassword(password);

        const user=await usermodel.create({name,email,password:hashpassword});

        const token=await  user.generatetoken();

        res.cookie("token",token , {
            httpOnly: true,     
            secure: false,
            sameSite: 'strict', 
            maxAge: 7*24 * 60 * 60 * 1000,
        })

        return res.status(200).json({user,token});
    }catch(error){
        res.status(500).json({ message: `register error ${error}` })
    }
}

export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await usermodel.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const ismatch= await user.comparepassword(password);
        if(!ismatch){
            return res.status(400).json({message:"Incorrect Password"});
        }
        const token=await  user.generatetoken();

        res.cookie("token",token , {
            httpOnly: true,     
            secure: false,
            sameSite: 'strict', 
            maxAge: 7*24 * 60 * 60 * 1000,
        })
        return res.status(200).json({user,token});

    }catch(error){
        return res.status(400).json({message:"Incorrect Password"});
    }
}

export const logout=async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"successfully logout"});
}



export const GoogleLogIn=async(req,res)=>{
    try{
        const{name,email}=req.body;
        let user=await usermodel.findOne({email})
        if(!user){
            user=await usermodel.create({name,email});
        }
        
        const token=await user.generatetoken();

        res.cookie("token",token , {
            httpOnly: true,     
            secure: false,
            sameSite: 'strict', 
            maxAge: 7*24 * 60 * 60 * 1000,
        })
        return res.status(200).json({user,token});
    }catch(error){
        res.status(500).json({ message: `GoogleLogIn error ${error}` })
    }
}


//ADMIN SIDE
export const adminlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token=await gettokenforadmin(email);
            
            res.cookie("token",token , {
                httpOnly: true,     
                secure: false,
                sameSite: 'strict', 
                maxAge: 7*24 * 60 * 60 * 1000,
            })
            return res.status(200).json(token);
        }

        return res.status(400).json({message:"Invalid Creadintials"});

    }catch(error){
        console.log("adminlogin error",error);
        res.status(500).json({ message: `adminlogin error ${error}` });
    }
}