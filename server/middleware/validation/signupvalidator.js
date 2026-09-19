const {body}=require("express-validator");

const signupvalidator=[
body("fullname")
.trim()
.notEmpty()
.withMessage("Name cant be empty"),

body("username")
.trim()
.notEmpty()
.withMessage("username cant be empty"),

body("password")
.trim()
.notEmpty()
.withMessage("Password cant be empty")
.isLength({min:8})
.withMessage("The password should be of 8 characters"),

body("confirmpassword")
.trim()
.notEmpty()
.withMessage("Confirm Password cant be empty")
.isLength({min:8})
.withMessage("The password should be of 8 characters")
.custom((value,{req})=>{
    return value==req.body.password;
})
.withMessage("Confirm Password should be same as password"),
]
module.exports=signupvalidator;