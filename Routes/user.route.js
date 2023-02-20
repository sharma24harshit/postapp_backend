const express = require("express");
const {UserModel} = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
//-----------------------------------------  REGISTER  -----------------------------------------//
userRouter.post("/register", async(req,res)=>{
    const {name, email, gender, password, age, city} = req.body;
    try {
        bcrypt.hash(password, 5, async(err,secure_pass)=>{
            if(err){
                res.send({"msg":"Please enter a strong password"});
            }
            else{
                const user = new UserModel({name, email, gender, age, city, password:secure_pass});
                await user.save()
                res.send({"msg":"User Registered Sucessfully"});
            }
        })
    } catch (error) {
        res.send({"msg":error.message});
    }
})

//-----------------------------------------  LOGIN  -----------------------------------------//

userRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
   try {
    const user = await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password, user[0].password, (err, result) =>{
           if(result){
           const token = jwt.sign({userID:user[0]._id}, "masai");
           res.send({"msg":"Login Successfully", token:token})
           }
           else{
            res.send({"msg":"Invalid Credentialss"});
           }
        });
    }
    else{
        res.send({"msg":"Invalid Credentialss"});
    }
   } catch (error) {
    res.send({"msg":error.message});
   }        
})

module.exports = {userRouter}