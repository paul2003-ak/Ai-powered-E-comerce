import ordermodel from "../model/order.model.js";
import usermodel from "../model/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import razorpay from "razorpay";


export const placeorder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userid = req.userId;
        const orderdata = {
            items,
            amount,
            address,
            userID: userid,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const neworder = await ordermodel.create(orderdata);
        await usermodel.findByIdAndUpdate(userid, { cartData: {} });

        return res.status(201).json({ message: "Placeorder successfully", neworder });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "placeorder error" }, error);
    }
}


export const userorders = async (req, res) => {
    try {
        const userid = req.userId;
        const orders = await ordermodel.find({ userID: userid })
        console.log(orders)
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "userOrder error", error })
    }
}

//for Razorpay
const razorpayInstance=new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
})


import mongoose from 'mongoose';

export const placeorderrazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    // Step 1: Generate a temporary ObjectId to match receipt <-> order._id
    const generatedOrderId = new mongoose.Types.ObjectId();

    // Step 2: Create Razorpay order using that generatedOrderId as receipt
    const options = {
      amount: amount * 100,           // Razorpay needs amount in paise
      currency: 'INR',
      receipt: generatedOrderId.toString()
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    if (!razorpayOrder) {
      return res.status(500).json({ message: 'Razorpay order not created' });
    }

    // Step 3: Save order to DB using that same _id
    const orderdata = {
      _id: generatedOrderId,          // ✅ Save with same ID used in receipt
      items,
      amount,
      address,
      userID: userId,
      paymentMethod: 'Razorpay',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new ordermodel(orderdata);
    await newOrder.save().then(() => {
      console.log("✅ Order saved in MongoDB");
    }).catch((err) => {
      console.error("❌ Order save failed:", err);
    });

    // Step 4: Send Razorpay details back to frontend
    res.status(200).json({
      message: 'Razorpay order created successfully',
      orderId: razorpayOrder.id,          // Razorpay order ID
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Razorpay order error', error });
  }
};



export const verifyrazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
      const userId = req.userId;
  
      // Fetch all payments made on this order
      const response = await razorpayInstance.orders.fetchPayments(razorpay_order_id);
      const payments = response.items;
  
      if (payments.length === 0) {
        return res.status(400).json({ message: "No payment found for this order" });
      }
  
      const payment = payments[0]; // We assume one payment per order
  
      if (payment.status === 'captured') {
        // Fetch MongoDB order ID (you used _id as receipt while creating order)
        const order = await razorpayInstance.orders.fetch(razorpay_order_id);
        const mongoOrderId = order.receipt;
  
        await ordermodel.findByIdAndUpdate(mongoOrderId, { payment: true });
        await usermodel.findByIdAndUpdate(userId, { cartData: {} });
  
        return res.status(200).json({ message: "Payment verified ✅" });
      } else {
        return res.status(400).json({ message: "Payment not captured ❌" });
      }
  
    } catch (error) {
      console.error("verifyrazorpay error:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }





//for admin
export const allorder = async (req, res) => {
    try {
        const orders = await ordermodel.find({})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "admin Allorder", error });
    }
}

export const updatestatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await ordermodel.findByIdAndUpdate(orderId, { status });
        return res.status(201).json({ message: "status Update" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
