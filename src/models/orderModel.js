const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    userId : String,
    productId: String,
    amount: Number,
    isFreeAppUser: {
        type: Boolean,
        default: true
    },
    date: String

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema)
