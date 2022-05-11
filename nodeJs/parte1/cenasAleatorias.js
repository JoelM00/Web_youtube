const stuff = require('./stuff')


console.log(stuff.counter(['ola','ma','frend']))
console.log(stuff.adder(2,3))
console.log(stuff.adder(stuff.pi,0))


setTimeout(function() {
    console.log("TIMEOUT: 3sec have passed")
},3000)


var time = 0

var timer = setInterval(() => {
    time += 1
    console.log(time + "sec have passed")
    if (time > 5) {
        clearInterval(timer)
        console.log("CLEAR")
    }
},1000)


console.log(__dirname)
console.log(__filename)

