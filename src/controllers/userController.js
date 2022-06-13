const UserModel= require("../models/userModel")


// Ques-2: Write a POST api to create a user that takes user details from the request body. If the header isFreeAppUser is not present terminate the request response cycle with an error message that the request is missing a mandatory header

const checkUser = async function (req, res, next){
    let check = req.headers.isFreeAppUser
    console.log(check)
    if(!check) res.send({msg: "request is missing a mandatory header"})
    else next()
}


const createUser= async function (req, res) {
    let data = req.body
    // let data= req.header.isFreeAppUser
    // console.log(data)
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
    // let tokenDataInHeaders= req.headers.token
    // console.log(tokenDataInHeaders)
    
}










const basicCode= async function(req, res, next) {
    let tokenDataInHeaders= req.headers.token
    console.log(tokenDataInHeaders)

    console.log( "HEADER DATA ABOVE")
    console.log( "hey man, congrats you have reached the Handler")
    //res.send({ msg: "This is coming from controller (handler)"})
    next()
    }


const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.basicCode= basicCode
module.exports.checkUser = checkUser