let query=require("../query")
async function getfolderfiles(req,res){
    try{
let folders=await query.getfoldersdashboarddb(req.user.id);
let files=await query.getfilesdashboarddb(req.user.id);
res.status(200).json({
    folders:folders,
    files:files
})
    }
    catch(error){
        res.status(404).json({
            message:error.msg
        })
    }
}
module.exports=getfolderfiles