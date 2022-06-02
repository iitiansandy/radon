
const printDate = function() {
    let currentDate = new Date();
    console.log(currentDate)
}

const printMonth = function() {
    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    console.log('The current month is ' +currentMonth)
}

const getBatchInfo = function() {
    let info = 'Radon, W3D3, the topic for today is Node.js module system'
    console.log(info)
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo