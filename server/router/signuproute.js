let {Router}=require("express");
let signuprouter=Router();
let signupcontroller=require("../controller/signupcontroller.js");
let signupvalidator=require("../middleware/validation/signupvalidator.js");
signuprouter.post("/",signupvalidator,signupcontroller);
module.exports=signuprouter;