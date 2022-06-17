const UserModel= require("../models/userModel")
const axios = require("axios")

let getSortedCities = async function(req, res){
    try{
        let cities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "London", "Moscow"]
        let cityObjectArr = []

        for(let i=0; i<cities.length; i++){
            let obj = { city: cities[i]}
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=2b0b553ebd2ff0dd169e21fb477c354d`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp
            cityObjectArr.push(obj)
        }

        let sorted = cityObjectArr.sort( function(a, b) {return a.temp - b.temp})

        console.log(sorted)
        res.status(200).send( {status:true, data: sorted} )
    }

    catch(error){
        console.log(error)
        res.status(500).send( {status: false, msg: "server error"} )
    }
}



// kjjk















const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.getSortedCities = getSortedCities
// module.exports.basicCode= basicCode