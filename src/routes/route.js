const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishController= require("../controllers/publishController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )
router.post("/createPublisher", publishController.createPublisher  )
router.put("/addNewfield", bookController.addNewfield  )



router.get("/getBookswithAllDetails", bookController.getBookswithAllDetails)

router.get("/getBooksWithAuthorDetailsandPublish", bookController.getBooksWithAuthorDetailsandPublish)

module.exports = router;