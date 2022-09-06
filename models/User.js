const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    erpId: {
        type: Number,
        length: 8,
        unique: true,
    },
    erpPsa: {
        type: String,
        maxLength: 16,
        required: true
    },
    designation: {
        type: String,
        enum: ["JE"],
        default: "JE"
    },
    phoneNumber: {
        type: Number,
        length: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 80,
    },
    role: [{
        type: String,
        maxLength: 5
    }]
});


const User = mongoose.model('User', userSchema);

module.exports = User