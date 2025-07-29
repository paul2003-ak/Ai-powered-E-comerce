import usermodel from "../model/user.model.js";

//add to cart
export const addtocart=async(req,res)=>{
    try{
        const {itemId,size} =req.body;

        const userdata=await usermodel.findById(req.userId);

        //if user exists
        if(!userdata){
            return res.status(404).json({message: " User not found"})
        }

        //Ensure cartData is initialized
        let cartdata=userdata.cartData || {};

        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size] += 1;
            }
            else{
                cartdata[itemId][size]=1;
            }
        }
        else{
            cartdata[itemId]={};
            cartdata[itemId][size]=1;
        }

        await usermodel.findByIdAndUpdate(req.userId,{cartData:cartdata});
        return res.status(200).json({message: "Add to cart successfull"});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Add to cart error"},error);
    }
}

//Updatecart
export const updateCart=async(req,res)=>{
    try{
        const {itemId,size,quantity}=req.body;//quantity is i want 'M' size same t-shirt 2 or more 
        const userdata=await usermodel.findById(req.userId);

        let cartdata=await userdata.cartData;
        
        cartdata[itemId][size]=quantity;//suppose i send quantity 4 of same shirt and same size then the cartdat[itemId][size] becomes that quantity
        await usermodel.findByIdAndUpdate(req.userId,{cartData:cartdata});
        return res.status(200).json({message: "Update the cart "});
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Update to cart error"},error);
    }
}

//get all carts of user
export const getUsercart=async(req,res)=>{
    try{
        const userdata=await usermodel.findById(req.userId).select('-password');
        if (!userdata) return res.status(404).json({ message: "User not found" });
        const cartdata=userdata.cartData;

        return res.status(200).json(cartdata);
    }catch(error){
        console.log(error)
    }
}


