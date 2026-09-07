const express=require("express");
const app=express();
let cors=require("cors");
app.use(cors());
let port=3000|process.env.PORT
app.listen(port,(error)=>{
    if(error){
        console.error("There is a error");
    }
    else{
        console.log("App listening")
    }
})