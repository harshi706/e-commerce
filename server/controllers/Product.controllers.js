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
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        const {name,description,price,category,image,stock}=req.body;
        product.name=name||product.name;
        product.description=description||product.description;
        product.price=price||product.price;
        product.category=category||product.category;
        product.image=image||product.image;
        product.stock=stock||product.stock;
        const updatedProduct=await product.save();
        res.status(201).json({success:true,message:"Product updated successfully",updatedProduct})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to update the product"})
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        await product.deleteOne();
        res.status(201).json({success:true,message:"Product deleted successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:"Failed to delete the product"})
    }
}

export {getAllProducts,createProduct,getProductById,updateProduct,deleteProduct}; 