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
    try{
        const {refreshToken}=req.body;
        if(!refreshToken){
            return res.status(400).json({success:false,message:"No refresh token found"})
        }
        const user=await User.findOne({refreshToken})
        if(!user){
            return res.status(401).json({success:false,message:"No user found with this refresh token"})
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
            if(err){
            return res.status(401).json({success:false,message:"Verification fails for refresh token"})
            }
            const newAccessToken=user.generateAccessToken();
            return res.status(200).json({success:true,message:"Generated new access token",newAccessToken})
        })

    }catch(error){
        return res.status(500).json({success:false,message:"Failed to refresh access token!"})
    }
}

const logout=async(req,res)=>{
    try{
        const {refreshToken}=req.body;
        if(!refreshToken){
            return res.status(400).json({success:false,message:"Empty refresh token"})
        }
        const user=await User.findOne({refreshToken});
        if(!user){
            return res.status(400).json({success:false,message:"User not found while logging out"})
        }
        user.refreshToken=null;
        await user.save();
        return res.status(200).json({success:true,message:"User logged out successfully!"})
    }catch(error){
        return res.status(500).json({success:false,message:"Logout failed!"})
    }
}

export {signup,login,refreshAccessToken,logout}