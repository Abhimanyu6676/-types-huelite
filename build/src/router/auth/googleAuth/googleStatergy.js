"use strict";
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var configAuth = require('./config');
// used to serialize the user for the session
/*   passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
 
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  }); */
// code for login (use('local-login', new LocalStategy))
// code for signup (use('local-signup', new LocalStategy))
// code for facebook (use('facebook', new FacebookStrategy))
// code for twitter (use('twitter', new TwitterStrategy))
// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true
}, function (token, refreshToken, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    // try to find the user based on their google id
    console.log('>>>>>>>>>> ' + profile.id);
    return done(null, "newUser");
    /* User.findOne({ 'google.id' : profile.id }, function(err:any, user:any) {
        if (err)
            return done(err);

        if (user) {

            // if a user is found, log them in
            return done(null, user);
        } else {
            // if the user isnt in our database, create a new user
            var newUser          = new User();
            // set all of the relevant information
            newUser.google.id    = profile.id;
            newUser.google.token = token;
            newUser.google.name  = profile.displayName;
            newUser.google.email = profile.emails[0].value; // pull the first email

            // save the user
            newUser.save(function(err:any) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }
    }); */
}));
