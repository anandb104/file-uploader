const {Router}=require("express");
let dashboardrouter=Router();
let dashboardcontroller=require("../controller/dashboardcontroller")
dashboardrouter.get("/",dashboardcontroller);
module.exports=dashboardrouter