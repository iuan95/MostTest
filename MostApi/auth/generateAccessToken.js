const jwt = require("jsonwebtoken");
const generateAccessToken = (user) =>{
    return jwt.sign({id: user._id, email: user.email}, "1111111111111111111", {
        expiresIn: "7d"
    })
}
module.exports = generateAccessToken;