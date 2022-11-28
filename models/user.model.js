const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "User name must required"],
        unique: [true, "User name already taken"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password must required"]
    }
})


const User = mongoose.model("User", userSchema);

module.exports = User;