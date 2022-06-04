const express = require('express');

// // const externalModule = require('./routes/logger.js')
const router = express.Router();
const lodash = require('lodash');

// const externalModule = require('../logger/logger')
// const myHelper = require('../util/helper')
// const myFormatter = require('../validator/formatter')


// Lodash Prob (a)
router.get('/hello' , function (req, res){
    const arr = ["January", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "October", "November", "December"]
    console.log(lodash.chunk(arr,4));
    
    res.send('This is month API');
})


// Lodash Prob (b)
router.get('/functionUp', function(req, res){
    const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    console.log(lodash.tail(nums));

    res.send(lodash.tail(nums));
})

router.get('/candidates', function(req, res){
    console.log('query parameters for this request are ' +JSON.stringify(req.query)); //query parameter
    let gender = req.query.gender;
    let state = req.query.state;
    let district = req.query.district;
    console.log('Gender is ' +gender);
    console.log('State is '+state);
    console.log('District is ' +district);
    let candidates = ['Akash', 'Sabiha', 'Sandeep'];

    res.send(candidates);
})

router.get('/candidates/:name', function(req, res){
    console.log('The request object is '+ JSON.stringify(req.params)) //path parameter
    console.log('candidate name is ' +req.params.name);
    res.send( (req.params.name) );
})

// Lodash Prob (c)
router.get('/unionnums', function (req, res){
    const dupnums1 = [1, 2, 3, 4];
    const dupnums2 = [5, 2, 3, 6];
    const dupnums3 = [1, 5, 7, 4];
    const dupnums4 = [1, 7, 3, 9];
    const dupnums5 = [8, 2, 11, 4];

    console.log(lodash.union(dupnums1, dupnums2, dupnums3, dupnums4, dupnums5));

    res.send('this is union API');
})

// Lodash Prob (d)
router.get('/usepairs', function(req, res){
    const duparr = [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']];
    console.log(lodash.fromPairs(duparr));

    res.send('this is userpair API');
})

// Pritesh Sir Class Task
// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
// app.get("/so11", function(req, res){
//     let arr1 = [1,2,3,5,6,7];
//     let total = 0;
//     for(var i in arr1){
//         total += arr1[i];
//     }

//     let lastDigit = arr1.pop();
//     let sum1 = lastDigit + (lastDigit + 1)/2;
//     let missingNum = sum1 - total;

//     res.send({ data:missingNum });
// })

// // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
// app.get("/so12", function(req, res){
//     let arr2 = [33, 34, 35, 37, 38];
//     let len = arr2.length;

//     let total1 = 0;
//     for(var i in arr2){
//         total1 += arr2[i];

//         let firstDigit1 = arr2[0];
//         let lastDigit1 = arr2.pop();
//         let consecutiveSum = (len + 1) * (firstDigit1 + lastDigit1) / 2;
//         let missingNum1 = consecutiveSum - total1;

//         res.send( {data: missingNum1} );

//     }
// })



// API Assignment
// Prob 1:-
router.get('/movies', function (req, res) {

    const movie = ['Caption America', 'Iron Man', 'Avengers', 'Spiderman'];
    console.log(movie);
    
    res.send('Hello there');
});

// Prob 2 and 3:-
router.get('/movies/:indexNumber', function (req, res){
    const movie = ['Caption America', 'Iron Man', 'Avengers', 'Spiderman', 'hera feri'];
    
    let indexNumber;
    if(req.params.indexNumber > movie.length){
        console.log('The entered index is greater than the max limit. Please enter a valid index');

        res.send('Invalid index')
        } else {
            console.log(movie[req.params.indexNumber])

            res.send(movie[req.params.indexNumber]);
        }
        
    
})

// Prob 4:-
router.get('/films/:filmId', function (req, res){
    const movie2 = [{"id": 1, "name": "The Shining"}, {"id": 2, "name": "Iron Man"}, {"id": 3, "name": "Incendies"}, {"id": 4, "name": "Rang de Basanti"}, {"id": 5, "name": "Finding Nemo"}]

    if (req.params.filmId < movie2.length){
        console.log(movie2[req.params.filmId])
        res.send(movie2[req.params.filmId])
    }else {
        console.log('Invalid ID');
        res.send('Invalid ID')
    }
})

module.exports = router;