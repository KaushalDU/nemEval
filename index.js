const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");

const app = express();
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to db");
        console.log("Server is running at port 8080");
    }catch(err){
        console.log(err);
    }
   
})