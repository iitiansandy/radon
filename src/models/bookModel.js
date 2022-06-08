const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name: {
        type: String,
        require: true
    },
    author_id: {
        type: Number,
        require: true
    },
    price: Number,
    rating: String,
    
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //users

