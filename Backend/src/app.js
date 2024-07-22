const express = require("express");
const app = express();
const userRouter = require("./router/user-router");
const libroRouter = require("./router/libro-router");
require('dotenv').config({path:__dirname+'/.env'});


const {PORT} = process.env || 3000
app.use(express.json());

app.get("/", async (req, res)=>{
    res.status(200).json({messaage: "welcome to app"});
});

app.use(libroRouter);
app.use(userRouter);



app.listen(PORT, ()=>{
 console.log(`server started on port  ${PORT}`);
})