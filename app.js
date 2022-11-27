const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")
})

// register
app.get("/register", (req, res) => {
    res.render("register")
})


// login
app.get("/login", (req, res) => {
    res.render("login")
})


// profile
app.get("/profile", (req, res) => {
    res.render("profile")
})

module.exports = app;