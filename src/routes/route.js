const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")




router.post("/authors", authorController.createAuthor)

router.get("/blogs", blogController.getBlog)


router.put("/blogs/:blogId", blogController.updatedBlog)

router.post("/blogs", blogController.createBlog)
router.delete("/blogs",blogController.deletebyquery)


router.delete("/blogs/:blogId", blogController.deletedBlog)
module.exports = router;