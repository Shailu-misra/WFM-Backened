const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const consumerSchema = new Schema({
    accountId: {
        type: String,
        required: true,
        maxLength: 12
    },
    name: {
        type: String,
        maxLength: 60,
        required: true
    },
    fatherName: {
        type: String,
        maxLength: 60
    },
    phoneNumber: {
        type: Number,
        length: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        maxLength: 100
    },
    totalOutstanding: {
        type: Decimal128, 
    },
    feederCode: {
        type: String,
        maxLength: 14
    },
    feeder: {
        type: String,
        maxLength: 30
    }
});


const Consumer = mongoose.model('Consumer', userSchema);

module.exports = Consumer