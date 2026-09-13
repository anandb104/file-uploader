function requireauth(req,res){
if(!req.isAuthenticated()){
   return res.status(400).json({
      message:"User not logged in"
    })
}
next();
}
module.exports=requireauth