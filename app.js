var express=require("express"),
        app=express(),
   mongoose=require("mongoose"),
 bodyParser=require("body-parser"),
 MethodOverride=require("method-override"),
 flash=require("connect-flash"),
 Campground=require("./models/campground"),
     seedDB=require("./seeds");
     Comment=require("./models/comment"),
     passport=require("passport"),
 LocalStrategy=require("passport-local"),
 passportLocalMongoose=require("passport-local-mongoose"),
 User=require("./models/user");
 var commentRoutes=require("./routes/comments");
 var campgroundRoutes=require("./routes/campground");
 var indexRoutes=require("./routes/index");

//seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(MethodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));

//auth setup
app.use(require("express-session")({
    secret:"i am king",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 app.use(function(req,res,next){
     res.locals.currentUser=req.user;
     next();
 })
app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);

const PORT= process.env.PORT||3000;

app.listen(PORT,function(err,okay){
    if(err)
    {
        console.log(err);
    }
    else
    console.log("yelpcamp has started");
});