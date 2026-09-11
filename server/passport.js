let localstrategy=require("passport-local").Strategy;
let passport=require("passport");
let bcrypt=require("bcryptjs");
let query=require("./query.js");
passport.use(
    new localstrategy(
        async(username,password,done)=>{
            let user=await query.checkusernamedb(username);
            if(!user){
                return done(null,false,{
                    message:"No user with this username"
                })
            }
            let matched=bcrypt.compare(password,user.password);
            if(!matched){
                return done(null,false,{
                    message:"Incorrect Password"
                })
            }
            return done(null,user);
        }
    )
)
passport.serializeUser((user,done)=>{
    return done(null,user.id);
})
passport.deserializeUser(async(id,done)=>{
    let user=await finduserdb(id);
    return done(null,user);
})