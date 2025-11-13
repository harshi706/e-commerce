import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"


const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({success:false,message:"Provide all the details required"})
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({success:false,message:"User already exists"})
    }
    const user=await User.create({
        name,email,password
    })
    console.log(user);
    return res.status(200).json({success:true,message:"User created successfully",user})
    }catch(error){
        return res.status(500).json({success:false,message:"Signup failed"})
    }
    
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({success:false,message:"Provide all the details required"})
    }
    const existingUser=await User.findOne({email});
    if(!existingUser){
        return res.status(400).json({success:false,message:"User does not exist"})
    }
    const isPasswordValid=await existingUser.matchPassword(password);
    if(!isPasswordValid){
        return res.status(400).json({success:false,message:"Invalid credentials"})
    }
    const accessToken=existingUser.generateAccessToken();
    const refreshToken=existingUser.generateRefreshToken();
    existingUser.refreshToken=refreshToken;
    await existingUser.save();
    return res.status(200).json({success:true,message:"Login successful",user:existingUser,accessToken,refreshToken})
    }catch(error){
        return res.status(500).json({success:false,message:"Login failed"})
    }
}
const refreshAccessToken=async(req,res)=>{

}
export {signup,login,refreshAccessToken}