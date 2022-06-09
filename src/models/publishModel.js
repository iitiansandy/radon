const mongoose = require('mongoose');

const publishSchema = new mongoose.Schema( {
    publish_id:String,
    name:String,
    headQuarter:String
})
module.exports = mongoose.model('publish', publishSchema)