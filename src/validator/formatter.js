const trim = function() {
    let a = " functionup "
    console.log(a)
    let b = a.trim()
    console.log(b)
}

const changeToLowerCase = function() {
    let c = "This is A String"
    let d = c.toLocaleLowerCase()
    console.log(d)
}

const changeToUpperCase = function() {
    let e = "this is a string"
    let f = e.toUpperCase()
    console.log(f)
}

module.exports.trim = trim
module.exports.changeToLowerCase = changeToLowerCase
module.exports.changeToUpperCase = changeToUpperCase