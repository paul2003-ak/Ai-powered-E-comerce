import jwt from 'jsonwebtoken'

export const gettokenforadmin=(email)=>{
    try{
        const token=jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token;
    }catch(error){
        console.log(error);
    }
}