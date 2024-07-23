const jwt = require("jsonwebtoken");
require('dotenv').config({path:'../.env'});



const authenticate =(req, resp, next)=>{
    const {JWT_SECRET} = process.env

    let token = req.header("Authorization");
    token = token.replace("Bearer ", "")
    if(!token) return resp.status(401).json({message: "Acceso denegado!"})

     try{
       req.status = jwt.verify(token, JWT_SECRET)
        next()
     
     }catch(error){
        resp.status(400).json({message:"Por favor autentificate"})
     }
    
}

module.exports =authenticate