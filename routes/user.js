const express = require("express")
let router =express.Router();  //router is a variable name                                                                                                                                                                                                                                                                                                                                                                                                                                             

router.get("/user",(req,res)=>{ //caps or small nop
    res.send("user  information");
})

router.get("/newuser",(req,res)=>{
    res.send("id +req.params.id");
})

router.get("/delete",(req,res)=>{
    res.send("user deleted");
})

router
      .route('/:id')
      .get((req,res)=>{
        console.log(req.usery)//get by accesssing
          res.send("user  information retrived value " + req.params.id);    
      })
      .post((req,res)=>{
          res.send("user created ");
      })
      .put((req,res)=>{
          res.send("user updated " + req.params.id);
      })
      .delete((req,res)=>{
          res.send("user deleted"  + req.params.id);
      })


      const users=[{name:"raja"},{name:"rani"},{name:"sepoy"}];

// router.param('id',(req,res,next,id)=>{
//     console.log(id)
//     req.usery=users[id];
//     next();
// })

router.param('id',(req,res,next,id)=>{
    console.log(id)
    req.usery=users[1];
    next();
})



// router.get('/:id',(req,res)=>{
//     res.send("retrive id "+req.params.id);
// })

// router.put('/:id',(req,res)=>{
//     res.send("update id "+req.params.id);
// })

// router.delete('/:id',(req,res)=>{
//     res.send("delete id "+req.params.id);
// })
module.exports=router;//that variable created is exported


