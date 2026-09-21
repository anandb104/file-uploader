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
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./lib/prisma.js");
require("./passport.js");
let passport=require("passport");
const loginrouter = require("./router/loginroute.js");
const logoutrouter = require("./router/logoutroute.js");
const authrouter=require("./router/authroute.js");
const folderrouter=require("./router/folderroute.js");
const filerouter=require("./router/fileroute.js");
const dashboardrouter=require("./router/dashboardroute.js");
app.use(session({
    store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000
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
app.use("/login",loginrouter);
app.use("/logout",logoutrouter);
app.use("/auth",authrouter);
app.use("/folder",folderrouter);
app.use("/file",filerouter);
app.use("/dashboard",dashboardrouter);
let port=3000|process.env.PORT
app.listen(port,(error)=>{
    if(error){
        console.error("There is a error");
    }
    else{
        console.log("App listening")
    }
})