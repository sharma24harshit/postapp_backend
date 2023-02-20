const express = require("express");
const {PostModel} = require("../Models/post.model");

const postRoute = express.Router();
//---------------------------------------  GET  -------------------------------------------//
postRoute.get("/", async(req,res)=>{
    const query = req.query;
    const id = req.body.userID 
    if(query){
        const post = await PostModel.find({userID:id}).where(query);
        res.send(post);
    }
    else{
        const post = await PostModel.find({userID:id});
        res.send(post);
    }

})

postRoute.get("/top", async(req,res)=>{
    const id = req.body.userID 
    const post = await PostModel.find({userID:id});
     let max=0; let value=0;
    for(let i=0 ;i<post.length; i++){
        if(post[i].no_if_comments >max){
            max = post[i].no_if_comments;
            value = post[i]._id
        }
    }
    const data = await PostModel.find({"_id":value});
    res.send(data);
})

//---------------------------------------  POST  -------------------------------------------//
postRoute.post("/create", async(req,res)=>{
    const payload = req.body;
    try {
        const post = new PostModel(payload);
        await post.save()
        res.send({"msg":"Post created successfully"});
    } catch (error) {
      res.send({"msg":error.message})  
    }
})
//---------------------------------------  PATCH  -------------------------------------------//
postRoute.patch("/update/:id", async(req,res)=>{
    const id = req.params.id;
    const payload = req.body;
    const post  = await PostModel.findOne({"_id":id});
    const post_userID = post.userID;
    const req_userID = req.body.userID;
    try {
        if(post_userID === req_userID ){
            await PostModel.findByIdAndUpdate({"_id":id}, payload);
            res.send({"msg":"Post Updated successfully"});
        }
        else{
            res.send({"msg":"You are not Authorized"});
        }
    } catch (error) {
        res.send({"msg":error.message})   
    }
})
//---------------------------------------  DELETE  -------------------------------------------//
postRoute.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id;
    const post  = await PostModel.findOne({"_id":id});
    const post_userID = post.userID;
    const req_userID = req.body.userID;
    try {
        if(post_userID === req_userID ){
            await PostModel.findByIdAndDelete({"_id":id});
            res.send({"msg":"Post Deleted successfully"});
        }
        else{
            res.send({"msg":"You are not Authorized"});
        }
    } catch (error) {
        res.send({"msg":error.message})   
    }
})


module.exports  = {postRoute}


