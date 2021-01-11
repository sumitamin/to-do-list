require("dotenv").config()
module.exports = {
    dbUrl: process.env.dbUrl,
    port: process.env.PORT || 3000,
    secretKey: process.env.secretKey,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpireToken: process.env.EXPIRE_TOKEN,
}