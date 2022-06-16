const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel")




// const basicCode= async function(req, res) {
//     let tokenDataInHeaders= req.headers.token
//     console.log(tokenDataInHeaders)

//     console.log( "HEADER DATA ABOVE")
//     console.log( "hey man, congrats you have reached the Handler")
//     res.send({ msg: "This is coming from controller (handler)"})
//     }


// CREATE USER
const createUser = async function (req, res) {
  try {
    let data = req.body;
    console.log(data)
    if (Object.keys(data).length != 0) {
      let savedData = await UserModel.create(data);
      // console.log(req.newAtribute)
      res.status(201).send({ msg: savedData });
    }
    else res.status(500).send({ msg: "BAD REQUEST" })
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }
};


// LOGIN USER
const loginUser = async function (req, res) {

  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    console.log(userName)
    console.log(password)
    // if (Object.keys(user).length != 0)
    let user = await UserModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(500).send({
        status: false,
        msg: "username or the password is not corerct",
      });
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "functionup-thorium"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, data: token });
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }

};


// GET USER DATA
const getUsersData = async function (req, res) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    //If no token is present in the request header return error
    if (!token) return res.status(500).send({ status: false, msg: "token must be present" });

    console.log(token);

    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken)
      return res.status(500).send({ status: false, msg: "token is invalid" });


    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.status(500).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.status(500).send({ status: false, msg: "No such user exists" });

    res.status(201).send({ status: true, data: userDetails });
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }

};


// UPDATE USER
const updateUser = async function (req, res) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    //If no token is present in the request header return error
    if (!token) return res.status(500).send({ status: false, msg: "token must be present" });
    console.log(token);
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken)
      return res.status(500).send({ status: false, msg: "token is invalid" });

    // Authorization  
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId
    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.status(500).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

    let userId = req.params.userId;
    let user = await UserModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.status(500).send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, userData);
    res.status(201).send({ status: true, data: "Data Updated" });
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }
};


// POST MESSAGE
const postMessage = async function (req, res) {
  try {
    let message = req.body.message
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    let token = req.headers["x-auth-token"]
    if (!token) return res.status(500).send({ status: false, msg: "token must be present in the request header" })
    let decodedToken = jwt.verify(token, 'functionup-thorium')

    if (!decodedToken) return res.status(500).send({ status: false, msg: "token is not valid" })

    //userId for which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.status(500).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

    let user = await UserModel.findById(req.params.userId)
    if (!user) return res.status(500).send({ status: false, msg: 'No such user exists' })

    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await UserModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

    //return the updated user document
    return res.status(201).send({ status: true, data: updatedUser })
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }
}


// DELETE USER
const deleteUser = async function (req, res) {
  try{
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.status(500).send({ status: false, msg: "token must be present" });

  console.log(token);

  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.status(500).send({ status: false, msg: "token is invalid" });

  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn) return res.status(500).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

  let userId = req.params.userId;
  let user = await UserModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(500).send("No such user exists");
  }

  let userData = req.body;
  let deleteUser = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, userData);
  res.status(201).send({ status: deleteUser, data: deleteUser });
  }
  catch (err) {
    console.log("Error: ", err.message)
    res.status(500).send({ msg: "Error: ", error: err.message })
  }
};

module.exports.createUser = createUser
module.exports.getUsersData = getUsersData
// module.exports.basicCode= basicCode
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser