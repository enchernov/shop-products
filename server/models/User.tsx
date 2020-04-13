const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        trim: true,
        minlength: 1,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        minlength: 6
    }
});

export default mongoose.model('User', UserSchema);
