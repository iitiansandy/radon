const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController");
const userModel = require('../models/userModel.js');

router.get("/test-me", function (req, res) {

    res.send("BookSchema API")
})

router.post("/createBook", UserController.createBook  )

router.get("/getBooksData", UserController.getBooksData)

module.exports = router;