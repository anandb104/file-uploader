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
let session=require("express-session");
let pgsession=require("connect-pg-simple")(session);
require("./passport.js");
let passport=require("passport");
app.use(session({
    store:new pgsession({
        conString:process.env.DATABASE_URL
    }),
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET,
    cookie:{
        maxAge:1000*60*60*24
    }
}));
app.use(passport.initialize());
app.use(passport.session());
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