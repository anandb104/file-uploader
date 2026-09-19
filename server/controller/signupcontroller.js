const {validationResult,matchedData}=require("express-validator");
const bcrypt=require("bcryptjs");
let query=require("../query.js");
async function signupcontroller(req,res){
let errors=validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({
errors:errors.array()
})
}
try{
let data=matchedData(req);
let fullname=data.fullname;
let username=data.username;
let result=await query.checkusernamedb(username);
console.log(result);
if(result){
    return res.status(401).json({
        message:"Username Already Exists"
    })
}
let password=data.password;
let hashedpassword=await bcrypt.hash(password,10);
let user=await query.createuserdb(fullname,username,hashedpassword);
req.login(user,(error)=>{
    if(error){
        res.status(402).json({
            message:"Something Went Wrong during login"
        })
    }
})
res.status(200).json({
    message:"Account Created Successfully",
    user:{
        fullname:user.fullname,
        username:user.username,
        password:user.password
    }
})
}
catch(error){
    res.status(404).json(
        {
            message:error.message
        }
    )
}
}
module.exports=signupcontroller