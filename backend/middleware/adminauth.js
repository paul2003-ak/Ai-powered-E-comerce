import jwt from 'jsonwebtoken'

export const adminauth=async(req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message: 'Token not found' }); 
        }

        const verifytoken=jwt.verify(token,process.env.JWT_SECRET);

        if(!verifytoken){
            return res.status(401).json({ message: 'Admin does not have valid token' }); 
        }
      
          req.adminEmail=process.env.ADMIN_EMAIL;
          next();

    }catch(error){
        console.error('AdminAuth error:', error);
        return res.status(500).json({ message: 'AdminAuth middleware error' },error);
    }
}