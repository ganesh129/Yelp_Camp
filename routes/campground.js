var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

router.get("/campgrounds",isLoggedIn,function(req,res){
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log("something went wrong");
        }
        else
        res.render("./campgrounds/Index",{campgrounds:allcampgrounds});
    })
    
})

router.get("/campgrounds/new",function(req,res){
    res.render("./campgrounds/new");
})

router.get("/campgrounds/:id",function(req,res){
   
     Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
         if(error)
         {
             console.log(error);
         }
         else{
             res.render("./campgrounds/show",{campground:foundCampground});
         }
    })

 })
router.post("/campgrounds",function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var description=req.body.description;
   var newcampground={name:name,image:image,description:description};
  Campground.create(newcampground,function(err,newlycreated)
  {
      if(err)
      {
          console.log(err);
      }else
      {
        res.redirect("/campgrounds");
      }
  })
  
})

router.get("/campgrounds/:id/edit",function(req,res){
     Campground.findById(req.params.id,function(err,foundCampground){
         if(err)
         {
             console.log(err);
             res.redirect("/campgrounds");
         }
         else
         {
             res.render("./campgrounds/edit",{campground:foundCampground});
         }
    })
})
router.put("/campgrounds/:id",function(req,res){
    var data={name:req.body.name,image:req.params.image,description:req.body.description}
    Campground.findByIdAndUpdate(req.params.id,data,function(err,updateCampground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
           res.redirect("/campgrounds/"+req.params.id);
        } 
    })
})
router.delete("/campgrounds/:id",function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");
        }
    })
})
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

}
module.exports=router;