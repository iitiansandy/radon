const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId = req.body.author
    let publisherId = req.body.publisher
    if(!authorId){
        res.send({Error: "Plz enter author id"})
    }
    
    const authorInfo = await authorModel.findById(authorId)
    if(!authorInfo){
        res.send({Error: "Plz enter a valid author Id"})
    }

    if(!publisherId){
        res.send({Error: "Plz enter publisher id"})
    }

    const publisherInfo = await publisherModel.findById(publisherId)
    if(!publisherInfo){
        res.send({Error: "Plz enter a valid publisher id"})
    }

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate('author')
    let publishers = await bookModel.find().populate('publisher')
    res.send({data: books, publishers})
}

const booksCover = async function(req, res){
    let publisher1 = await publisherModel.findandUpdate({$: [{"publisher_name" : {$eq: "Penguine"}}, {"publisher_name" : {$eq: "HarperCollins"}}]})
    // if(publisher1 == "Penguin" || publisher1 == "HarperCollins"){
        // isHardCover = true
        res.send({msg: publisher1, isHardCover})
    }
// }
// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author')
//     res.send({data: specificBook})

// }

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.booksCover = booksCover
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
