const{Router}=require("express");
const logoutrouter=Router();
logoutrouter.post("/",(req,res)=>{
    req.logout((error)=>{
        if(error){
            res.status(404).json({
                message:error.message
            })
        }
        else{
            res.status(200).json({
                message:'User Logged Out Sucessfully'
            })
        }
    })
})
module.exports=logoutrouter