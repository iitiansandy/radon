const jwt = require("jsonwebtoken");
const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let data= req.body
    if(Object.keys(data).length===0) return res.status(400).send({msg:"Request body is requird"})
    if (!data.fname)return res.status(400).send({msg:"fname is required"})
    if (!data.lname)return res.status(400).send({msg:"lname is required"})
    if (!data.title)return res.status(400).send({msg:"title is required"})
    
    if (!data.email)return res.status(400).send({msg:"email is required"})
    if (!data.password)return res.status(400).send({msg:"password is required"})
    let authorCreated = await authorModel.create(data)
    res.send({data: authorCreated})
}

// LOGIN USER
const loginUser = async function (req, res) {
    try{
    let userName = req.body.email;
    let password = req.body.password;
  if (!userName && ! password) return res.status(400).send({msg:"please enter username and password"})
    let author = await authorModel.findOne({ email: userName, password: password });
    
    if (!author)
      return res.status(400).send({
        status: false,
        msg: "username or the password is not corerct",
      })
  let token = jwt.sign(
      {
        authorId: author._id.toString(),
        batch: "radon",
        organisation: "FunctionUp",
      },
      "project-1"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, token: token });
  
  } catch (err) {
    console.log("This is the error:",err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
  
  }



module.exports.createAuthor= createAuthor
module.exports.loginUser = loginUser
