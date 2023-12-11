const express = require("express");
const { PostModel } = require("../models/post.model");
const { auth } = require("../middleware/auth.middleware");

const postRouter = express.Router();

postRouter.post("/add",auth,async(req,res)=>{
      try{
        const post = new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"A new post has been added"})
      }catch(err){
        res.status(400).send({"error":err})
      }
})

postRouter.get("/",auth,async(req,res)=>{
    const {device,device1,device2} = req.query
    const {userID} = req.body
    const query ={}
    if(device1 && device2){
      query.device = {$and:[{device:device1},{device:device2}]}
    } else if(device1){
        query.device= device1
    } else if(device2){
        query.device= device2
    }
    try{
        const posts = await PostModel.find({query})
        res.status(200).send({"Posts":posts})

    } catch(err){
         res.status(400).send({"error":err})
    }
})

postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID} = res.params
    try{
        const poast = await PostModel.findOne({_id:postID})
        if(req.body.userID === post.userID){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`Post with id:${postID} updated`})
        }else {
            res.status(400).send({"msg":"Not authorized"})
        }

    }
    catch(err){
        res.status(400).send({"error":err})
    }
})

postRouter.delete("/update/:postID",auth,async(req,res)=>{
    const {postID} = res.params
    try{
        const poast = await PostModel.findOne({_id:postID})
        if(req.body.userID === post.userID){
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.status(200).send({"msg":`Post with id:${postID} deleted`})
        }else {
            res.status(400).send({"msg":"Not authorized"})
        }

    }
    catch(err){
        res.status(400).send({"error":err})
    }
})


module.exports ={
    postRouter
}