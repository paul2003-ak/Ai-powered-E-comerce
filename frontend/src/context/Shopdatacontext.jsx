import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userdatacontext } from './userprotected';
import { toast } from 'react-toastify';

export const shopcontext = createContext();

const Shopdatacontext = ({ children }) => {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("")
    const [showsearch, setShowsearch] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { userdata } = useContext(userdatacontext)
    const currency = "₹";
    const delivery_fee = 10;

    const [cartItem, setCartItem] = useState({})

    const getproduct = async () => {
        try {
            const response = await axios.get(serverUrl + "/api/product/alllist")
            setProduct(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }


    const addtocart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
        let cartdata = structuredClone(cartItem)//clone the product 
        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += 1;
            }
            else {
                cartdata[itemId][size] = 1
            }
        }
        else {
            cartdata[itemId] = {};
            cartdata[itemId][size] = 1;
        }
        setCartItem(cartdata);
        toast.success("Added to cart");
        // console.log(cartdata);

        if (userdata) {
            try {
                const response = await axios.post(serverUrl + '/api/cart/addtocart', { itemId, size }, { withCredentials: true });
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("error")
        }
    }

    //get number cart of user
    const getUserCart=async()=>{
        try{
            const response=await axios.get(serverUrl + '/api/cart/getall', {withCredentials:true});
            setCartItem(response.data);
            console.log(response.data)
        }catch(error){
            console.log(error);
        }
    }

    const updateQuantity=async(itemId, size, quantity)=>{
        let cartdata=structuredClone(cartItem)
        cartdata[itemId][size]=quantity;
        setCartItem(cartdata);
        
        if(userdata){
            try{
                const response=await axios.post(serverUrl + '/api/cart/updatecart',{itemId,size,quantity},{withCredentials:true});
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
    }


    const getCartCount = () => {
        let totalcount = 0;
        for (const item in cartItem) {
            for (const items in cartItem[item]) {
                try {
                    if (cartItem[item][items] > 0) {
                        totalcount += cartItem[item][items];
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        return totalcount;
    }


    //count the total amount of the carts 
    const getCartAmount=()=>{
        let total=0;
        for(const items in cartItem){
            let iteminfo=product.find((item)=>item._id === items);
            for(const size in cartItem[items]){
                try{
                    if(cartItem[items][size] > 0){
                        total += iteminfo.price * cartItem[items][size];
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
        return total;
    }
    


    useEffect(() => {
        getproduct();
    }, [])

    useEffect(()=>{
        getUserCart();
    },[])

    const value = {
        product,
        setProduct,
        currency,
        delivery_fee,
        getproduct,
        search, setSearch,
        showsearch, setShowsearch,
        cartItem,
        setCartItem,
        addtocart,
        getCartCount,
        updateQuantity,
        getCartAmount
    }

    return (
        <div>
            <shopcontext.Provider value={value}>
                {children}
            </shopcontext.Provider>
        </div>
    )
}

export default Shopdatacontext