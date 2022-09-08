const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    erpPsa: {
        type: String,
        maxLength: 16,
        required: true
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
    creatorErpId: {
        type: Number,
        length: 8,
        required: true
    },
    reportingPhoneNumber: {
        type: Number,
        length: 10,
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
        maxLength: 12, 
    },
    uanNumber: {
        type: String,
        maxLength: 12,
    },
    feederCode: {
        type: String,
        maxLength: 14
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "BLACKLISTED"],
        default: "ACTIVE"
    }
});


const UserTP = mongoose.model('UserTP', userSchema);

module.exports = UserTP