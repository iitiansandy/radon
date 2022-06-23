const express = require('express');
const router = express.Router();
const { mid1,mid2 } = require("../middleware/auth")

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


router.post("/authors", authorController.createAuthor)

router.post("/blogs", mid1, blogController.createBlog)

router.post("/login", authorController.loginUser)

router.get("/blogs", mid1, blogController.getBlog)

router.put("/blogs/:blogId", mid1, mid2, blogController.updatedBlog)

router.delete("/blogs/:blogId", mid1, blogController.deletedBlog)

router.delete("/blogs", mid1, blogController.deletebyquery)

module.exports = router;