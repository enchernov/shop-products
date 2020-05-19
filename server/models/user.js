const { Schema, model } = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function(next) {
    if(!this.isModified("password")) {
        return next;
    }
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(this.password, salt).then((hash) => {
            this.password = hash;
            next();
        }).catch((err) => {
            return next(err);
        })
    }).catch((err) => {
        return next(err);
    })
})

module.exports = model('User', userSchema);
