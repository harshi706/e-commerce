import express from 'express'
import 'dotenv/config'
import connectDB from './db/index.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded())

connectDB();

app.get('/',(req,res)=>{
    res.status(200).send("home page")
})

import userRouter from "./routes/User.routes.js"
app.use('/auth',userRouter)

import productRouter from "./routes/Product.routes.js"
app.use('/api/products',productRouter)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})