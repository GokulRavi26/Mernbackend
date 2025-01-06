const express = require("express");
const app=express();
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    console.log("hi");
    res.send("hi")
})
const userRoute  = require ('./routes/user')
app.use('/user',userRoute)
app.listen(3000);