const multer=require("multer");
let storage=multer.diskStorage({
    destination:function(req,file,cb){
       return cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        return cb(null,Date.now()+"-"+file.originalname);
    }
});
let upload=multer({
    storage:storage
});
module.exports=upload