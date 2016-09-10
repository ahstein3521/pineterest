var Users=require("../models/user")

module.exports=function(app){
	var passport=require("passport");
	
	app.get('/auth', passport.authenticate('twitter'));
	
	app.get('/auth/error', function(req,res){
		res.redirect("/error")
	});
	app.get('/auth/callback',
		passport.authenticate('twitter', {failureRedirect: '/auth/error'}),
  		function(req,res){
  			res.redirect("/")
  		}
  	);
  	app.get("/logout",function(req,res){
  		req.logOut();
  		res.redirect("/")
  	})
  	app.get("/error",function(req,res){
  		res.send("Something went wrong")
  	})
  	app.get("/users",function(req,res){
  		Users.find({},function(e,d){
  			res.send(d)
  		})
  	})

}