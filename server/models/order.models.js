import mongoose from "mongoose";

const orderSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        orderItems:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                }
            }
        ],
        totalAmount:{
            type:Number,
            required:true
        },
        shippingAddress:{
            address:String,
            city:String,
            pincode:Number,
            country:String
        },
        paymentMethod:{
            type:String,
            default:"COD"
        },
        orderStatus:{
            type:String,
            default:"Pending",
            enum:["Pending","Shipped","Delivered","Cancelled"]
        }
    },{
        timestamps:true
    }
)

export const Order=mongoose.model("Order",orderSchema)