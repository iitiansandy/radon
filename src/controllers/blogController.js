const mongoose = require("mongoose");
const blogModel = require("../models/blogModel")

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)
}


const createBlog = async function (req, res) {
  try {
    let author_id = req.body.authorId
    let blog = req.body
    if (isValidObjectId(author_id)) {


      let blogCreated = await blogModel.create(blog)
      return res.status(201).send({ data: blogCreated })
    } else {
      res.status(400).send({ msg: "it is  not a valid author_id" })
    }


  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })

  }
}

const getBlog = async function (req, res) {

  try {
   
    data=req.query

    let allData = await blogModel.find(data,{isDeleted: true},{isPublished: false})


    if (allData) {

      res.status(200).send({ msg: allData })
    }
    else {
      res.status(404).send({ msg: "document not found" })
    }



  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}


const updatedBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;


    let blog = await blogModel.findById(blogId);

    console.log(blog)
    if (!blog) {
      return res.status(400).send("No such blog exists");
    }


    let blogData = req.body;
    let date = new Date()
    let updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { set: blogData, publishedAt: date }, { new: true });
    res.status(400).send({ status: true, data: updatedBlog });





  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
};



const deletedBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;


    let blog = await blogModel.findById(blogId);


    if (blog) {

      blogData = req.body
      let deletedBlog = await blogModel.findOneAndUpdate({ _id: blog._id }, blogData, { new: true });
      res.status(200).send({ status: true, data: deletedBlog });
    } else {
      return res.status(404).send("No such blog exists");
    }


  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}
const deletebyquery = async function (req, res) {
  try {
    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subcategory = req.query.subcategory
    let isPublished = req.query.isPublished
    let blog = {

    }
    if (authorId) {
      blog.authorId = authorId
    }
    if (category) {
      blog.category
    }
    if (tags) {
      blog.tags = tags
    }
    if (subcategory) {
      blog.subcategory = subcategory
    } if (isPublished) {
      blog.isPublished = isPublished
    }

    console.log

    let data = await blogModel.updateMany(blog, {
      $set: {
        isDeleted: true, deletedAt: Date()
      }
    }, { new: true });
    if (data) {


      res.status(200).send({ status: true })
    }
    else {
      res.status(404).send({ msg: "document not found" })
    }

  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}









module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.updatedBlog = updatedBlog
module.exports.deletedBlog = deletedBlog
module.exports.deletebyquery = deletebyquery

