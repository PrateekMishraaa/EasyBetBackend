import express from "express"
const router = express.Router()
import User from "../models/UserSchema.js"
import JWT from "jsonwebtoken"
import bcrypt from "bcryptjs"

router.post('/register',async(req,res)=>{
    const {UserName,FullName,Email,Password} = req.body;
    if(!UserName || !FullName || !Email || !Password){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const isUserExist = await User.findOne({Email})
        if(isUserExist){
            return res.status(209).json({message:"User Already exist with this email"})
        }
        const NewUser = await User.create({
            FullName,
            UserName,
            Email,
            Password
        })
        console.log('user created',NewUser)
        return res.status(200).json({message:"User created successfully",user:NewUser})
    }catch(error){
        console.log('error',error)
        return res.status(500).json({message:"Internal server error",error})
    }
})
router.post('/login',async(req,res)=>{
    const {UserName,Password} = req.body;
    if(!UserName || !Password){
        return res.status(400).json({message:"Invalid credentials"})
    }
    try{
        const isUser = await User.findOne({UserName})
        if(!isUser){
            return res.status(404).json({message:"User not found with this email"})
        }
        const isMatch = await bcrypt.compare(Password,isUser.Password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"})
        }
        const payload ={
            username:isUser.UserName,
            email:isUser.Email,

        }
        const token = await JWT.sign(payload,"thisissecret",{expiresIn:"2d"})
        return res.status(200).json({message:"User login successfully",token,payload})
    }catch(error){
        console.log('error',error)
        return res.status(500).json({message:"Internal server error",error})
    }
})



export default router