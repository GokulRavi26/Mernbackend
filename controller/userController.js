import user from "../model/usermodel.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
 export const create =async(req, res)=>{
     try{
        
         let userdata = new user(req.body)
        const{email}=userdata;

         const userExist=await user.findOne({email});
        if(userExist){
             res.status(400).json({error:"user already exist"});
         }
         else{
            const savedata=await userdata.save();
             res.status(200).json({data:savedata});
         }
        
     }
     catch{
         res.status(500).json({error:"internal server error"});
     }
 }

 export const fetch =async(req, res)=>{
     try{       
         const users = await user.find();
         if(users.length===0){
             res.status(404).json({error:"user not found"});
         }
         res.status(200).json({data:users});
     }
     catch{
         res.status(500).json({error:"internal server error"});
     }
 }
    
 export const update =async(req, res)=>{
     try{       
        const id=req.params.id;
        const userExist=await user.findOne({_id:id});
         if(!userExist){
             res.status(404).json({error:"user not found"});
         }    
            const updatedusers = await user.findByIdAndUpdate(id,req.body,{new:true});
         res.status(200).json({data:updatedusers});
     }
     catch{
         res.status(500).json({error:"internal server error"});
     }
 }
 
 export const deleted =async(req, res)=>{
     try{       
        const id=req.params.id;
        const userExist=await user.findOne({_id:id});
         if(!userExist){
             res.status(404).json({error:"user not found"});
         }    
            const deletedusers = await user.findByIdAndDelete(id);
         res.status(200).json({data:deletedusers});
     }
     catch{
         res.status(500).json({error:"internal server error"});
     }
 }
 export const findvalue = async(req, res)=>{
     try{
         const id=req.params.id;
         const userExist=await user.findOne({_id:id});
         if(!userExist){
             res.status(404).json({error:"user not found"});
         }    
         res.status(200).json({data:userExist});
     }
     catch{
         res.status(500).json({error:"internal server error"});
     }
 }



export const generateTokens = async (req, res) => {
  try {
    const users = await user.find(); // Fetch all users

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const tokens = users.map((userData) => {
      const token = jwt.sign(
        { id: userData._id, name: userData.name, email: userData.email },
        process.env.JWT_SECRET, // Secret key from .env
        { expiresIn: "1h" } // Token validity
      );
      return { email: userData.email, token };
    });

    res.status(200).json({ tokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
