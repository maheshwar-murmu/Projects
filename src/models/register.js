const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true,
    },
});

const Register = mongoose.model('Register', userSchema);

module.exports = Register;
