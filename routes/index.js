var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var passport=require("passport");
var User=require("../models/user")
router.get("/",function(req,res){
    res.render("landing");
});


router.get("/register",function(req,res){
    res.render("register");
})
router.post("/register",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
       passport.authenticate("local")(req,res,function(){
           res.redirect("/campgrounds");
       })
    })
})
//Login routes
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),function(req,res){
   
})
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

}
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})
module.exports=router;