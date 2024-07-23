const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authenticate")
const {hashPassword,comparePassword} =require("../utils/helpers")
const {getData, ObjectId} = require("../models/mongo-client");
require('dotenv').config({path:__dirname+'/.env'});

const {JWT_SECRET} = process.env

 router.post("/usuario/crear", async (req, res)=>{

   let userkeys = Object.keys(req.body)
   let validatedKeys=  ['nombres','username','contrasena','email'].every(key => userkeys.indexOf(key)>=0 )
   await getData(async (db)=>{
    data = await db.collection('usuarios').findOne({$or:[{username:req.body.username}, {email:req.body.email}]});
         if(!data && validatedKeys){
            let hpass = hashPassword(req.body.contrasena)
            let inserted =await db.collection('usuarios').insertOne(
                {nombres: req.body.nombres, username:req.body.username,
                 contrasena: hpass, email:req.body.email, access:true
            })
            if(inserted){req._id= inserted.insertedId}
         }
       
 });

 if(!data){

     const token = jwt.sign({_id:req._id}, JWT_SECRET, {expiresIn: "7 days"});
    res.status(200).send({accessToken: token, message:"usuario creado"})
    return
 }

   res.status(200).send({message:"usario ya exite!"})
})

.post("/usuario/login",async (req, res)=>{
   let userkeys = Object.keys(req.body)
   let validatedKeys=  ['username','contrasena'].every(key => userkeys.indexOf(key)>=0 )

   if(validatedKeys){
  await getData(async (db)=>{
   data = await db.collection('usuarios').findOne({username: req.body.username})
 
     req._id = data._id
})
      console.log(data.contrasena)
      console.log(req.body.contrasena)
      
     if (comparePassword(req.body.contrasena, data.contrasena)){
      const token = jwt.sign({_id:req._id}, JWT_SECRET, {expiresIn: "7 days"});
      res.status(200).send(
         {accessToken: token,
         status:200})
         return
     }
   }
   res.status(200).send(
      {message: "usuario o contrasena invalida",
      status:200})

   })

.put("/usuario/password",auth,async(req, res)=>{
   
      let hashP= hashPassword(req.body.contrasena)
     await getData(async (db)=>{
      data = await db.collection('usuarios').updateOne(
      {_id: new ObjectId(req.status._id)},{ $set: { contrasena: hashP }})
   })
    res.status(200).send(
       {message: "your password was changed",
       status:200})
   })
   
.put("/usuario/email",auth,async (req, res)=>{
   await getData(async (db)=>{
    data = await db.collection('usuarios').updateOne(
    {_id: new ObjectId(req.status._id)},{ $set: { email: req.body.email }})
     console.log(req.status._id)
 })
  res.status(200).send(
     {message: "your email was changed",
     status:200})
 })
 

module.exports = router;