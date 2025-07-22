const express=require('express');
const router=express.Router();

const User=require('../models/userModel')
router.use(express.json());

router.post('/history',(req,res)=>{
    const email=req.body.email;
    const movieId=req.body.movieId;
  try{ 
    const user=User.findByIdAndUpdate(
        {email},
        {$addToSet:{watchHistory:movieId}},
        {upsert:true}
    )
     
  }
  catch(error){
    console.log('History error:'+error);
  }
})
module.exports =router
