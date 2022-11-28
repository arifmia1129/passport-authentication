const passport = require("passport");
const User = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: config.googleClient.id,
    clientSecret: config.googleClient.secret,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById({ _id: id });
        done(null, user);

    } catch (error) {
        done(error, false);
    }
});
