const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData  )

// router.put("/users/:userId", BookController.updateUser)



router.post("/users", UserController.createUser)

router.post("/login", UserController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", UserController.getUsersData)

router.post("/users/:userId/posts", UserController.postMessage)

router.put("/users/:userId", UserController.updateUser)

router.delete('/users/:userId', UserController.deleteUser)

module.exports = router;