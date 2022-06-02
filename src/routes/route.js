const express = require('express');

// const externalModule = require('./routes/logger.js')
const router = express.Router();

const externalModule = require('../logger/logger')
const myHelper = require('../util/helper')
const myFormatter = require('../validator/formatter')


router.get('/test-me', function (req, res) {
    myFormatter.trim()
    myFormatter.changeToLowerCase()
    myFormatter.changeToUpperCase()
    // const externalModule = require()
    // console.log('The constant in logger route has a value '+externalModule.endpoint)
    // console.log('The current batch is '+externalModule.batch)
    // externalModule.log()
    
    // myHelper.printDate()
    // myHelper.printMonth()
    // myHelper.getBatchInfo()
    res.send('My first ever api! ')

    // res.send('Today Date ' + externalModule.printDate()+ " , " + externalModule.printMonth())


});

module.exports = router;
// adding this comment for no reason