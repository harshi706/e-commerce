import { Product } from "../models/product.models.js";

const getAllProducts=async(req,res)=>{
    try{
        
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to get all products"})
    }
}



export {getAllProducts}; 