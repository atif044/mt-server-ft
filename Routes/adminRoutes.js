const express=require('express');
const User=require('../Models/User');
const app=express();
const verifyJwt = require('../Middleware/middleware');
const Profile=require('../Models/profile')
const multer=require('multer')

//=========================FETCH ALL WHO ARE NOT APPROVED
app.get('/all_np',verifyJwt,async(req,res)=>{
    try {
        let allUsersId=[]
        let allUsers=[]
        let admin=await User.findById(req.data.user.id);
        if(admin.isAdmin===false){
            return res.status(403).json({msg:"You are UnAuthorized. You are not admin."})
        }
        let user=await User.find({isApproved:false}).select('-Password');
        if(user.length!==0){
            return res.status(200).json(user)
        }
        return res.status(200).json({msg:"No User Found"})

    } catch (error) {
        
    }
})
//=========================TO APPROVE USERS via their ID
app.post('/approve/:id',verifyJwt,async(req,res)=>{
    try { 
        let admin=await User.findById(req.data.user.id);
    if(admin.isAdmin===false){
        return res.status(403).json({error:"You are UnAuthorized. You are not admin."})
    }
    let id=req.params.id;
    let user=await User.findById(id);
    if(user.isApproved===false){
        await user.updateOne({isApproved:true});
        let saved = await user.save()
        if(saved){
            return res.status(200).json({msg:"User has been approved to login"});
        }
    }
    return res.status(200).json({error:"This User is already approved"})
    } catch (error) {
        
    }
})
module.exports=app;