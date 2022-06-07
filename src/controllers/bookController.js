const { count } = require("console")
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const bookList= async function (req, res) {
    let allBooks = await bookModel.find().select({bookName: 1, authorName: 1, _id: 0})
    return res.send({msg: allBooks})
}

const getBookInYear = async function (req, res) {
    let publishingYear = req.body.year
    let allBooks = await bookModel.find({year: publishingYear})
    return res.send({msg: allBooks})
}

const getParticularBooks = async function(req, res){
    console.log(req.body)
    let output = await bookModel.find(req.body)
    res.send(output)
}

const getXINRBooks = async function(req, res){
    let inrBooks = await bookModel.find({$or: [{"price.indianPrice" : {$eq: "200INR"}}, {"price.indianPrice" : {$eq: "500INR"}}, {"price.indianPrice" : {$eq: "100INR"}}]})
    return res.send({msg: inrBooks})

}

const getRandomBooks = async function(req, res){
    let allBooks = await bookModel.find({$or: [{totalPages: {$gt: "500"}}, {stockAvailable: true}]})
    return res.send({msg: allBooks})
}

const getBooksData = async function(req, res){
    let allUsers = await bookModel.find().count()
    return res.send({msg: allUsers})
}


module.exports.createBook= createBook
module.exports.bookList = bookList
module.exports.getBookInYear = getBookInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
module.exports.getBooksData = getBooksData