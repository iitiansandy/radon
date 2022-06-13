const mongoose = require('mongoose');
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createBook= async function (req, res) {
    let book = req.body
    let author_id=req.body.author_id
    let publish_id=req.body.publish_id
    if(!author_id){
    return res.send({msg:"author_id is required"} )
    }
    if(!isValidObjectId(author_id)){
       return res.send({ msg:"author_id is not valid"})

    }
    if(!publish_id){
      return  res.send({msg:"publish_id is required"} )
        }
        if(!isValidObjectId(publish_id)){
          return  res.send({ msg:"public_id is not valid"})
    
        }


    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksWithAuthorDetailsandPublish = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author_id','publish_id'])
    res.send({data: specificBook})

}
const getBookswithAllDetails= async function (req, res) {
    let books = await bookModel.find().populate(['author_id','publish_id'])
    res.send({data: books})
}
const addNewfield=async function (req, res) {
 let updatebook=await bookModel.find()
 res.send({data: updatebook})
}
const getRating =async function( req,res){
    let data=req.body
    RatedBook=await bookModel.updateMany(       
        {rating:{$gt:3.5}},
                              {$inc:{price:10}},
                      
                             {new:true}),{$set:data},{upsert:true}
                            
    res.send({data: RatedBook})
}

module.exports.createBook= createBook
module.exports.getBookswithAllDetails= getBookswithAllDetails
module.exports.getBooksWithAuthorDetailsandPublish = getBooksWithAuthorDetailsandPublish
module.exports.addNewfield= addNewfield
module.exports.getRating= getRating