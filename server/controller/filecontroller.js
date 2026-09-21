let query=require("../query");
async function uploadfile(req,res){
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    console.log("FOLDER ID:", req.body.folderid);
    try{
        if(!req.file){
            res.status(404).json({
                message:"No file is selected"
            })
        }
let folderid=req.body.folderid;
if(folderid){
    let folder=await query.checkiffolderexistsdb(folderid,req.user.id);
    if(!folder){
    return res.status(404).json({
        message:"folder does not exist"
    })
    }
}
let file;
if(folderid)
file=await query.uploadfilewithfolderdb(req.file.originalname,req.file.mimetype,req.file.filename,req.file.path,req.file.size,req.user.id,folderid);
else
file=await query.uploadfilewithoutfolderdb(req.file.originalname,req.file.mimetype,req.file.filename,req.file.path,req.file.size,req.user.id);
res.status(200).json({
message:"File Uploaded Successfully",
file:file
})
    }
    catch(error){
     res.status(404).json({
        message:error.message
     })
    }
}
module.exports={
    uploadfile,
}