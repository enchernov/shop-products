const AuthQuery = {
    viewer: async(_parent, _args, { req, models }) => {
        if (!req.email) {
            return null;
        }
        return models.User.findOne({ email: req.email });
    }
};

module.exports = AuthQuery;
