const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

router.post("/test-post", function (req, res) {


    // let id=req.body.user;
    // let pwd = req.body.password;

    // console.log(id, pwd)
    console.log( req.body )
    res.send({msg: "hi", status: true})
})

router.post("/test-post-2", function(req, res){
    let arr = [12, "functionUp"];
    let ele = req.body.element;
    arr.push(ele)

    res.send( {msg: arr, status: true} )
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

module.exports = router;