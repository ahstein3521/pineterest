var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var pinSchema=new Schema({
	image:String,
	title:String,
	postedBy:{type:Schema.Types.ObjectId,ref:"User"}
	// likedBy:[{type:Schema.Types.ObjectId,ref:"User"}],
	// totalLikes:Number
})

// pinSchema.statics.loadForUser=function(user,callback){
// 	this.model("Pins").find({},{likedBy:{$elemMatch:{_id:user}}},callback)
// }

// pinSchema.statics.LIKE=function(ID,user,likes,callback){
// 	this.model("Pins").findByIdAndUpdate({_id:ID},{$push:{likedBy:user},$inc:{totalLikes:1}},{upsert:true,new:true,safe:true},callback);	
// }

// pinSchema.statics.UNLIKE=function(ID,user,callback){
// 	this.model("Pins").findByIdAndUpdate({_id:ID},{$pull:{likedBy:user}},{upsert:true,new:true,safe:true},callback);	
// }

pinSchema.post("save",function(doc){
	this.model("User").findById(doc.postedBy,function(err,user){
		user.posts.push(doc._id);
		user.save();
	})
})


module.exports=mongoose.model("Pins",pinSchema);