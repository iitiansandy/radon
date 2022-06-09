const publishModel= require("../models/publishModel")


const createPublisher= async function (req, res) {
    let author = req.body
    let authorCreated = await publishModel.create(author)
    res.send({data: authorCreated})
}

const getPublishersData= async function (req, res) {
    let authors = await publishModel.find()
    res.send({data: authors})
}

module.exports.createPublisher= createPublisher
module.exports.getPublishersData= getPublishersData