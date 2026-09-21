let {Router}=require("express");
let folderrouter=Router();
let foldercontroller=require("../controller/foldercontroller");
folderrouter.post("/",foldercontroller.createfolder);
folderrouter.get("/",foldercontroller.getfolders);
module.exports=folderrouter;