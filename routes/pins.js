var Pin=require("../models/pin")
var User=require("../models/user")
module.exports=function(app){
	app.use(function(req,res,next){
		if(req.session.pins){
			next();
		}else{
			Pin.find({},function(err,pins){
				if(err) return next(err);
				req.session.pins={};
				pins.forEach(function(pin){
					//Creates a persistent state to minimize calls to the db
					req.session.pins[pin._id]=pin;
				})
				next();
			})		
		}
	})

	app.get("/",function(req,res){
		res.render("home",{pins:req.session.pins,user:req.user})
	})
	
	app.get("/board",function(req,res,next){
		var userID=req.query.user;
		User.findById(userID).populate("posts").exec(function(err,user){
			res.render("board",{pins:user.posts, user:req.user,person:user.displayName});
		})
	})
	app.get("/dashboard",function(req,res){
		if(!req.user) return res.redirect("/");
		
		Pin.find({postedBy:req.user._id},function(err,docs){
			res.render("dashboard",{pins:docs, user:req.user,canEdit:true});
		})
	})

	app.post("/pins/new",function(req,res){
		var body=req.body;
		var pin=new Pin({title:body.title,image:body.image,postedBy:req.user._id})
		pin.save(function(err,_pin){
			req.session.pins[_pin._id]=_pin;
			res.redirect("/dashboard");
		});		
	})
	
	app.put("/pins/repair/:id",function(req,res){
		var id=req.params.id;
		var image="public/dist/images/default.jpg";
		
		Pin.findByIdAndUpdate(id,{"$set":{"image":image}},{new:true,upsert:true,safe:true},function(err){
			if(err) return res.status(500).send(err);
			req.session.pins[id].image=image;
			res.redirect(303,"/dashboard");
		})
	})

	app.delete("/pins/:id",function(req,res){
		var id=req.params.id
		Pin.findByIdAndRemove({_id:id},function(err){
			if(err){
				return res.status(500).send(err);
			}
			delete req.session.pins[id];
			res.status(200).send("Successfully deleted "+id)
		})
	})
}