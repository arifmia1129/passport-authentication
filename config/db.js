const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.db.url)
    .then(() => {
        console.log("Successfully Database connected");
    })
    .catch((error) => {
        console.log(`Error: ${error.message}`)
    })