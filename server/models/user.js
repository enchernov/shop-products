const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

delete mongoose.connection.models['User'];

const userSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = model('User', userSchema);
