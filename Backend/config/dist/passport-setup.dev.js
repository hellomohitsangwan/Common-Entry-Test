"use strict";

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

var User = require('../models/user-model');

var mongoose = require('mongoose');

require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: 'https://common-entry-test.herokuapp.com/auth/google/redirect'
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({
    googleId: profile.id
  }).then(function (currentUser) {
    if (currentUser) {
      console.log('user is: ', currentUser);
      var token = jwt.sign({});
      done(null, currentUser);
    } else {
      var email = profile._json.email;
      var res = email.split("@")[1];

      if (!res.includes("gmail")) {
        console.log('I am Included as non Gmail ');
        done("Error Is Here !! , Non Gmail Guy I am ", null);
      } // Similar Stuff For Verifying VIT Student Id .


      new User({
        _id: new mongoose.Types.ObjectId(),
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email
      }).save().then(function (newUser) {
        console.log('created new user: ', newUser);
        done(null, newUser);
      });
    }
  });
}));