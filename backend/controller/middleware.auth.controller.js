import usermodel from '../model/user.model.js';

export const getcurruser=async(req,res)=>{
    try{
        const user = await usermodel.findById(req.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
          }

        return res.status(200).json(user);
    }catch(error){
        console.error('isauth controller error:', error);
        return res.status(500).json({ message: `isauth controller error ${error}` });
    }
}


export const getcurrAdmin=async(req,res)=>{
    try{
        let adminEmail=req.adminEmail;

        if (!adminEmail) {
            return res.status(401).json({ message: 'Unauthorized - Admin not found' });
          }

        return res.status(200).json({email:adminEmail , role:"admin"});
    }catch(error){
        console.error('getcurrAdmin controller error:', error);
        return res.status(500).json({ message: `getcurrAdmin controller error ${error}` });
    }
}