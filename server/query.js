let {prisma}=require("./lib/prisma.js");
async function checkusernamedb(username){
const user=await prisma.user.findUnique({
    where:{
        username:username
    }
})
return user; 
}
async function createuserdb(fullname,username,hashedpassword){
const user=await prisma.user.create(
    {
        data:{
            fullname:fullname,
            username:username,
            password:hashedpassword
        }
    }
)
return user;
}
async function finduserdb(id){
    const user=await prisma.user.findUnique(
        {
            where:{
                id:id
            }
        }
    )
    return user;
    }
async function createfolderdb(userid,name){
    const user=await prisma.folder.create({
        data:{
            userId:userid,
            name:name
        }
    })
    return user;
}

async function getfoldersdb(userid){
const user=await prisma.user.findFirst({
    where:{
     id:userid   
    },
    include:{
        folders:true
    }
})
return user.folders;
}
async function checkiffolderexistsdb(folderid,userid){
    let folder=await prisma.folder.findFirst({
        where:{
            id:folderid,
            userId:userid
        }
    })
    return folder;
    }
async function uploadfilewithfolderdb(originalname,mimetype,filename,path,size,userid,folderid){
let file=await prisma.file.create({
    data:{
        name:originalname,
        userId:userid,
        mime:mimetype,
        size:size,
        path:path,
        filename:filename,
        folderId:folderid
    }
})
return file;
}
async function uploadfilewithoutfolderdb(originalname,mimetype,filename,path,size,userid){
    let file=await prisma.file.create({
        data:{
            name:originalname,
            userId:userid,
            mime:mimetype,
            size:size,
            path:path,
            filename:filename,
            folderId:null
        }
    })
    return file;
    }

    async function getfoldersdashboarddb(userid){
        let folders=await prisma.folder.findMany({
            where:{
           userId:userid
            },
            orderBy:{
                created:"desc"
            }
        })
        return folders;
    }
    async function getfilesdashboarddb(userid){
        let files=await prisma.file.findMany({
            where:{
           userId:userid,
           folderId:null
            },
            orderBy:{
                created:"desc"
            }
        })
        return files;
    }
    async function getfolderdb(folderid,userid){
        let folder=prisma.folder.findFirst({
            where:{
                userId:userid,
                id:folderid
            },
            include:{
                files:true
            }
        })
        return folder;
    }
    async function getfiledb(userid,fileid){
        let file=prisma.file.findFirst({
            where:{
                userId:userid,
                id:fileid
            }
        })
        return file
    }
module.exports={
checkusernamedb,
finduserdb,
createuserdb,
createfolderdb,
checkiffolderexistsdb,
getfoldersdb,
uploadfilewithfolderdb,
uploadfilewithoutfolderdb,
getfoldersdashboarddb,
getfilesdashboarddb,
getfolderdb,
getfiledb,
}