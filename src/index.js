const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const midGlb = function (req, res, next){
//     console.log("Hi I am a Global Middleware")
//     next()
// }

const assignmentMW = function (req, res, next){
    var currentDate = new Date();
    var dateTime = currentDate.getDate() + " "
                  + (currentDate.getMonth() + 1) + " "
                  + currentDate.getFullYear() + " "
                  + currentDate.getHours() + ":"
                  + currentDate.getMinutes() + ":"
                  + currentDate.getSeconds();

    let ip = req.ip
    let url = req.originalUrl

    console.log(`${dateTime} ${ip} ${url}`)
}

app.use(assignmentMW)


// const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://dbuser:S%40ndy19891@cluster0.dl1os.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-wmomyk-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
