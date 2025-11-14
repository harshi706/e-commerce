import { Product } from "../models/product.models.js";

const createProduct=async(req,res)=>{
    try{
        const {name,description,price,category,image,stock}=req.body;
        const product=new Product({
            name,
            description,
            price,
            category,
            image,
            stock
        })
        const createdProduct=await product.save();
        res.status(201).json({success:true,message:"product created successfully",createdProduct})

    }catch(error){
        res.status(500).json({success:false,message:"Product creation failed"})
    }
}

const getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(201).json({success:true,message:"Fetched all products",products})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to get all products"})
    }
}

const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        res.status(201).json({success:true,message:"Product fetched",product})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to get this product"})
    }
}

const updateProduct=async(req,res)=>{
    try{
        
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to update the product"})
    }
}

const deleteProduct=async(req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({success:false,message:"Failed to delete the product"})
    }
}

export {getAllProducts,createProduct,getProductById,updateProduct,deleteProduct}; 