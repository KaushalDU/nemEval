const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
   const token = req.headers.authorization.split(" ")[1]
   if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            req.body.userId = decoded.userId
            req.body.name = decoded.name
            next()
        } else {
            res.send({"msg":"Not authorized"})
        }
    })
   } else{
    res.send({"msg":"Not authorized"})

   }
}

module.exports ={
    auth
}