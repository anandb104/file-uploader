let {Router}=require("express");
let folderrouter=Router();
let foldercontroller=require("../controller/foldercontroller");
folderrouter.post("/",foldercontroller.createfolder);
folderrouter.get("/",foldercontroller.getfolders);
folderrouter.get("/:id",foldercontroller.getfolder);
module.exports=folderrouter;