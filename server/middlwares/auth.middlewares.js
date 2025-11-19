import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"

export const verifyJWT=async(req,res,next)=>{
    let token;
    try{
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,message:"No token provided"})
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select("-password");
        if (!req.user) {
            return res.status(404).json({
                success: false,
                message: "User no longer exists"
            });
        }
        next()
    }
    }catch(error){
        return res.status(500).json({status:false,message:"JWT verification failed"})
    }
}

export const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin===true){
        next();
    }else{
        return res.status(403).json({success:false,message:"Admin access required"})
    }
}