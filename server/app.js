const express=require("express");
const app=express();
let cors=require("cors");
let signuprouter=require("./router/signuproute.js");
require("dotenv").config();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use("/signup",signuprouter);
let port=3000|process.env.PORT
app.listen(port,(error)=>{
    if(error){
        console.error("There is a error");
    }
    else{
        console.log("App listening")
    }
})