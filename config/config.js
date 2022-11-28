require("dotenv").config();

const dev = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: process.env.DB_URL
    },
    googleClient: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
    }
}

module.exports = dev;
