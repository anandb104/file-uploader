const{Router}=require("express");
const loginrouter=Router();
const passport=require("passport");
loginrouter.post("/",passport.authenticate("local"),(req,res)=>{
    res.status(200).json({
        message:"User Logged in Successfully",
        user:{
        fullname:req.user.fullname,
        username:req.user.username,
        }
    })
})
module.exports=loginrouter;