const jwt = require("jsonwebtoken");
const generateRefreshToken = (user) =>{
    return jwt.sign({id: user._id, email:user.email}, "222222222222222222222222", {
        expiresIn: "60d"
    })
}
module.exports = generateRefreshToken;