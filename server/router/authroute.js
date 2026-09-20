const{Router}=require("express");
authrouter=Router();
const auth=require("../middleware/authorization/auth.js");
authrouter.get("/me",auth);
module.exports=authrouter