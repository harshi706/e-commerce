import { Order } from "../models/order.models.js";


const createOrder=async(req,res)=>{
    try{
        const {orderItems,totalAmount,shippingAddress,paymentMethod}=req.body;
        if(!orderItems || orderItems.length===0){
            res.status(400).json({success:false,message:"No order items"})
        }
        const order=new Order({
            user:req.user._id,
            orderItems,totalAmount,shippingAddress,paymentMethod
        })
        const createdOrder=await order.save();
        res.status(201).json({success:true,message:"Order created successfully",createdOrder})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to create the order"})
    }
}

const getMyOrder=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id}).populate("orderItems.product");
        res.json({success:true,orders});
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to fetch my orders"})
    }
}

const getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find({}).populate("user","name email").populate("orderItems.product");
        res.status(200).json({success:true,message:"Fetched all orders",orders})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to get all orders"})
    }
}

const updateOrderStatus=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(400).json({success:false,message:"No order found"})
        }
        order.orderStatus=req.body.orderStatus || order.orderStatus;
        const updatedOrder=await order.save();
        res.status(200).json({success:true,message:"Updated order status",updatedOrder})
    }catch(error){
        res.status(500).json({success:false,message:"Failed to update the order status"})
    }
}

export {createOrder,getMyOrder,getAllOrders,updateOrderStatus}