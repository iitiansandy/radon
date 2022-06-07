const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBooks", BookController.createBook  )

router.post("/getParticularBooks", BookController.getParticularBooks)

router.post("/getBookInYear", BookController.getBookInYear  )

router.get("/bookList", BookController.bookList)

router.get("/getXINRBooks", BookController.getXINRBooks)

router.get("/getRandomBooks", BookController.getRandomBooks)

router.get("/getBooksData", BookController.getBooksData)

module.exports = router;