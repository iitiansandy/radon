const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const blogModel = require("../models/blogModel")

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)
}


const createBlog = async function (req, res) {
  try {
    let author_id = req.body.authorId
    let blog = req.body
    if (!blog.title) return res.status(400).send({ msg: "title is required" })
    if (!blog.body) return res.status(400).send({ msg: "body is required" })
    if (!blog.category) return res.status(400).send({ msg: "categoty is required" })
    if (!isValidObjectId(author_id)) return res.status(404).send({ msg: " author id is not valid" })


    let blogCreated = await blogModel.create(blog)
    return res.status(201).send({ data: blogCreated })



  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })

  }
}

const getBlog = async function (req, res) {

  try {
    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subcategory = req.query.subcategory

    let blog = {
      isDeleted: false,
      isPublished: false
    }

    if (authorId) {
      blog.authorId = authorId
    }
    if (category) {
      blog.category = category
    }
    if (tags) {
      blog.tags = tags
    }
    if (subcategory) {
      blog.subcategory = subcategory
    }

    let savedData = await blogModel.find(blog)
    if (savedData.length == 0) {
      return res.status(400).send({ status: false, msg: "No such Blogs Available" })
    } else {
      return res.status(200).send({ msg: savedData })
    }
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

const updatedBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;


    let blog = await blogModel.findById(blogId);


    if (!blog) {
      return res.status(400).send("No such blog exists");
    }


    let blogData = req.body;
    let date = new Date()
    let updatedBlog = await blogModel.findOneAndUpdate({ _id: blog._id }, { $set: blogData, publishedAt: date }, { new: true });
    if (!updatedBlog) return res.status(404).send({ msg: "not found" })
    res.status(200).send({ status: true, data: updatedBlog });





  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
};



const deletedBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;


    let blog = await blogModel.findById(blogId);


    if (!blog) return res.status(404).send({ msg: "not found" })

    // blogData = req.body
    let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, {
      $set: {
        isDeleted: true, deletedAt: Date()
      }
    }, { new: true });
    res.status(200).send({ status: true, data: deletedBlog });



  } catch (err) {
    console.log("This is the error:", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }

}
const deletebyquery = async function (req, res) {
  
    if (Object.keys(req.query).length == 0) {
      res.status(400).send({ status: false, msg: "atleast one query must be there" })
    }
     let authorId = req.query.authorId
     console.log(authorId)
    let category = req.query.category
    let tags = req.query.tags
    let subcategory = req.query.subcategory
    let isPublished = req.query.isPublished
    if (!authorId) return res.status(400).send({status: false, msg: "authorId must be present"})
    const tokenId = req.decodedToken.authorId
    console.log(req.decodedToken)
    if (authorId !== tokenId) {
      return res.status(403).send({
        msg: 'FORBIDDEN',
        error: 'User logged is not allowed to modify the requested users data',
      });
    }
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

    // console.log

    let data = await blogModel.updateMany(blog, {
      $set: {
        isDeleted: true, deletedAt: new Date()
      }
    }, { new: true });
    if (!data) return res.status(400).send({ msg: "updated data not found" })


    res.status(200).send({ status: true })
  }


module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.updatedBlog = updatedBlog
module.exports.deletedBlog = deletedBlog
module.exports.deletebyquery = deletebyquery

// User