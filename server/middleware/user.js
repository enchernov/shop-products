const jwt = require("jsonwebtoken");
const cookie = require('cookie');

module.exports = async (req, res, next) => {
    const { token } = cookie.parse(req.headers.cookie != null ? req.headers.cookie : '');
    if (token) {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        req.email = email;
    }
    next();
}

