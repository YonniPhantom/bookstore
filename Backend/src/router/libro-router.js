const express = require("express");
const router = new express.Router();

router.get('/libros',(req, res)=>{
    console.log(req.body)

    res.status(200).send([])
})
.post("/libro/leido", (req, res)=>{

    res.status(200).send({})
})
.put("/libro/rating",(req, res)=>{

})
.delete("/libro/leido", (req, res)=>{

    res.status(200).send({})
})


module.exports = router;