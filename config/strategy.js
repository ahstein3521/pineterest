var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User=require("../models/user");

module.exports = function(){
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret:process.env.TWITTER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
    },
    function(token, tokenSecret, profile, done){
            User.findOne({'twitter_id': profile.id}, function (error, user) {
                if (user) {
                    done(null, user);
                }
                else{
                    var user= new User({
                        image:profile._json.profile_image_url,
                        displayName:profile.displayName,
                        twitter_id:profile.id,
                        twitter_token:token,
                        twitter_secret:tokenSecret        
                        })
                    
                    user.save();
                    done(null,user);
                }
            })
        }
    ))
}