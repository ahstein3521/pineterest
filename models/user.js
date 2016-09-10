var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var userSchema=new Schema({
	image:String,
	displayName:String,
	twitter_id:String,
	twitter_token:String,
	twitter_secret:String, 
	posts:[{type:Schema.Types.ObjectId,ref:"Pins"}]
})

module.exports=mongoose.model("User",userSchema);