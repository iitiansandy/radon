const mongoose = require("mongoose");
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)
}

// const createBook= async function (req, res) {
//     let book = req.body
//     let author_id=req.body.author_id
//     let publish_id=req.body.publish_id
//     if(!author_id){
//     return res.send({msg:"author_id is required"} )
// //     }
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

const createBlog = async function (req, res) {
  let author_id = req.body.author_id
  let blog = req.body
  if (isValidObjectId(author_id)) {
    res.status(200).send({ msg: "author_id is valid" })

    let blogCreated = await blogModel.create(blog)
    return res.send({ data: blogCreated })
  } else {
    res.status(400).send({ msg: "it is  not a valid author_id" })
  }
}

const getBlog = async function (req, res) {

  let data = await blogModel.find()
  if (data) {

    res.send({ msg: data })
  }
  else {
    res.status(404).send({ msg: "document not found" })
  }
}
const getbyAuthor_id = async function (req, res) {
  let a = req.query.author_id
  let data = await blogModel.find({ author_id: a })
  res.send({ msg: data })
}
const getbyCategory = async function (req, res) {
  let a = req.query.category
  let data = await blogModel.find({ category: a })
  res.send({ msg: data })
}
const getbyTag = async function (req, res) {
  let a = req.query.tags
  let data = await blogModel.find({ tags: a })
  res.send({ msg: data })
}
const getbySubCat  = async function (req, res) {
  let a = req.query.subcategory
  let data = await blogModel.find({ subcategory: a })
  res.send({ msg: data })
}




const updateBlog= async function (req, res) {
 
  
  
    let blogId = req.params.blogId;
    console.log(blogId)
    
    let blog= await blogModel.findById(blogId);
    //Return an error if no user with the given id exists in the db
    if (!blog) {
      return res.send("No such blog exists");
    }
  
    let blogData = req.body;
    let updatedBlog = await blogModel.findByIdAndUpdate({_id:blogId},{$set:{blogData}},{new:true});
    res.send({ status: updatedBlog, data: updatedBlog});
  };
  
module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.getbyAuthor_id = getbyAuthor_id;
module.exports.getbyCategory=getbyCategory 
module.exports.getbyTag=getbyTag
module.exports.getbySubCat=getbySubCat
module.exports.updateBlog=updateBlog



