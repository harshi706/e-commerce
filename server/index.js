import express from 'express'
import 'dotenv/config'
import connectDB from './db/index.js';
import {User} from './models/user.models.js'

const app=express();
app.use(express.json())

connectDB();

app.get('/',(req,res)=>{
    res.status(200).send("home page")
})

app.post('/auth/signup',async(req,res)=>{
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
    
}) 
app.post('/auth/login',async(req,res)=>{
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
    return res.status(200).json({success:true,message:"Login successful",user:existingUser})
    }catch(error){
        return res.status(500).json({success:false,message:"Login failed"})
    }
})

// app.all((req,res)=>{
//     res.status(404).send("Invalid request")
// })
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})