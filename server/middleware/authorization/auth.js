async function authorization(req,res){
    if(!req.isAuthenticated()){
    res.status(404).json({
    user:null
    })
    }
    else{
     res.status(200).json({
     user:req.user
     })
    }
}
module.exports=authorization