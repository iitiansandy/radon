const { count } = require("console")
const BookModel = require("../models/bookModel")
const axios = require("axios")

const getMemes = async function (req, res){
    try{
        let options = {
            method: "post",
            url: "https://api.imgflip.com/caption_image?template_id=181913649&text0=Other Coding Bootcamps&text1=FunctionUp Bootcamp&username=memeskingsandy123&password=Q@ndy19891"
        }
        let result = await axios(options)
        res.status(200).send({data: result.data})
    }

    catch(error){
        console.log(error)
        res.status(500).send( {status: false, msg: "server error"} )
    }
}







// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.getMemes = getMemes
// module.exports.getBooksData = getBooksData
// module.exports.updateBooks = updateBooks
// module.exports.deleteBooks = deleteBooks
// module.exports.totalSalesPerAuthor = totalSalesPerAuthor
