const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel")



const mid1 = function (req, res, next) {
    // console.log(req)
    token = req.headers["x-api-key"]
    if (!token) token = req.headers["x-Api-key"]
    if (!token) return res.status(400).send({ status: false , msg: "token is required" })
    console.log(token)
    let decodedToken = jwt.verify(token, "project-1")
    if (!decodedToken) return res.status(400).send({ status: false , msg: " token is invalid" })
    // decodedToken = {userid:"bcbdbcd"}
    req.decodedToken = decodedToken;
    console.log(req.decodedToken)
    // let userLoggedIn = decodedToken.userId

    // let userModified = req.params.userId

    // if (userLoggedIn != userModified) return res.status(404).send({ status: false }, { msg: "you are not authorised to modify content" })

next()
}

const mid2 = async function (req, res, next) {
    try {
        // console.log(req.decodedToken)

        const token = req.decodedToken;
        const blogId = req.params.blogId;
        const blog = await blogModel.findById(blogId);

        if(!blog && blog.isDeleted == true){
            return res.status(400).send({status:false, msg:"Blog Not Found or may be deleted"})
        }
        const authorId = blog.authorId;
        if(token)
    //   let token = req.headers['x-Auth-token'];
    //   if (!token) token = req.headers['x-auth-token'];
    //   let userToBeModified = req.params.userId;
    //   let decodedToken = jwt.verify(token, 'functionup-radon');
    //   let userLoggedIn = decodedToken.userId;
      if (token.authorId != authorId)
        return res.status(403).send({
          msg: 'FORBIDDEN',
          error: 'User logged is not allowed to modify the requested users data',
        });
      next();
    } catch(err) {
      console.log('This is the error :', err.message);
      res.status(500).send({ msg: 'Error', error: err.message });
    }
  };
  

module.exports= {mid1, mid2}
// 