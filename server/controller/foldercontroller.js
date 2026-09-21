let query=require("../query.js");

async function createfolder(req,res){
    try{
    let name=req.body.name;
    if(name.trim()===""){
        return res.status(404).json({
            message:"No name is inputted for folder"
        });
    }
    let response=await query.createfolderdb(req.user.id,name.trim());
    return res.status(200).json({
        message:"Folder Created Successfully",
        folder:response
    })
}
catch(error){
return res.status(400).json({
    message:error.msg
})
}
}

async function getfolders(req,res){
try{
    let folders=await query.getfoldersdb(req.user.id);
    res.status(200).json({
        folders:folders
    })
}
catch(error){
    return res.status(404).json({
        message:error.msg
    })
}
}
module.exports={
    createfolder,
    getfolders,

}