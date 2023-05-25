const jwt = require('jsonwebtoken')
const verifyUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "1111111111111111111", (err, user) => {
            if (err) {
                return res.status(403).json("Токен не действительный!");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};
module.exports = verifyUser;

