module.exports = async (req, res, next) => {
    if (req.email) {
        return next();
    } else {
        return res.redirect('/signin');
    }
};
