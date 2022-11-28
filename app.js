const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const config = require("./config/config")

const session = require('express-session');
const passport = require("passport");
require("./config/passport")
const MongoStore = require('connect-mongo');

const User = require("./models/user.model");
require("./config/db");
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: config.db.url,
        collectionName: "sessions"
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("index")
})

// register
app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "user name not available"
            })
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            const user = new User({
                username,
                password: hash
            });

            await user.save();
            res.status(200).redirect("/login")
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something broken"
        })
    }
})


// login

const checkedAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/profile")
    }
    next();
}

app.get("/login", (req, res) => {
    res.render("login")
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: "/profile" }));


// profile
const isCheckedAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

app.get("/profile", isCheckedAuthenticated, (req, res) => {
    res.render("profile", { username: req.user.username })
})

// logout 
app.get('/logout', async (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = app;