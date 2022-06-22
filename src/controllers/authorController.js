const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let data= req.body
    if(Object.keys(data).length===0) return res.status(400).send({msg:"Request body is requird"})
    if (!data.fname)return res.status(400).send({msg:"fname is required"})
    if (!data.lname)return res.status(400).send({msg:"lname is required"})
    if (!data.title)return res.status(400).send({msg:"title is required"})
    
    if (!data.email)return res.status(400).send({msg:"email is required"})
    if (!data.password)return res.status(400).send({msg:"password is required"})
    let authorCreated = await authorModel.create(author)
    res.send({data: authorCreated})
}



module.exports.createAuthor= createAuthor
