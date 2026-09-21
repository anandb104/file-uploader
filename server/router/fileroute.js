const {Router}=require("express");
let filerouter=Router();
const filecontroller=require("../controller/filecontroller");
let upload=require("../middleware/upload");
filerouter.post("/upload",upload.single("file"),filecontroller.uploadfile);
filerouter.get("/:id",filecontroller.getfile);
filerouter.get("/:id/download",filecontroller.downloadfile);
module.exports=filerouter;