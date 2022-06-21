const mongoose = require("mongoose");
const authorModel = require("../models/authorModel")
const blogModel= require("../models/blogModel")
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

// const createBook= async function (req, res) {
//     let book = req.body
//     let author_id=req.body.author_id
//     let publish_id=req.body.publish_id
//     if(!author_id){
//     return res.send({msg:"author_id is required"} )
//     }
//     if(!isValidObjectId(author_id)){
//        return res.send({ msg:"author_id is not valid"})

//     }
//     if(!publish_id){
//       return  res.send({msg:"publish_id is required"} )
//         }
//         if(!isValidObjectId(publish_id)){
//           return  res.send({ msg:"public_id is not valid"})
    
//         }


//     let bookCreated = await bookModel.create(book)
//     res.send({data: bookCreated})
// }

const createBlog= async function (req, res) {
  
  let blog= req.body
  let blogCreated = await blogModel.create(blog)
  res.send({data: blogCreated})

}

module.exports.createBlog= createBlog;

