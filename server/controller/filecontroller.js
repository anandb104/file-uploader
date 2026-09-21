let query=require("../query");
let path=require("path");
async function uploadfile(req,res){
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
async function getfile(req,res){
    let fileid=req.params.id;
     try{
      let file=await query.getfiledb(req.user.id,fileid);
      res.status(200).json({
        file:file
      })
     }
     catch(error){
        res.status(404).json({
            message:error.message
        })
     }
}
async function downloadfile(req,res){
    try{
    let fileid=req.params.id;
    let file=await query.getfiledb(req.user.id,fileid);
      res.download(path.resolve(file.path),file.name);
    }
    catch(error){
        res.status(404).json({
         message:error.message
        })
    }
}
module.exports={
    uploadfile,
    getfile,
    downloadfile
}