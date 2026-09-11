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
module.exports={
checkusernamedb,
finduserdb,
createuserdb,
}