require('dotenv').config();

module.exports = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        return config
    },
    env: {
        MONGO_URI: process.env.MONGO_URI,
        SESSION_SECRET: process.env.SESSION_SECRET,
        JWT_SECRET: process.env.JWT_SECRET
    }
}
