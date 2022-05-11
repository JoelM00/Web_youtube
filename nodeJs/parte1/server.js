var http = require('http')
var fs = require('fs')


var server = http.createServer((req,res) => {
    console.log("Requested file: " + req.url)
    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.createReadStream(__dirname + "/index.html").pipe(res)
    } else if (req.url === '/contact') {
        res.writeHead(200,{'Content-Type': 'text/html'})
        fs.createReadStream(__dirname + "/contact.html").pipe(res)
    } else if (req.url === '/api/ninjas') {
        var ninjas = [{name: "joel", age: 20},{name: "Martin",age: 25}]
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.end(JSON.stringify(ninjas))
    } else {
        res.writeHead(404,{'Content-Type': 'text/html'})
        fs.createReadStream(__dirname + "/404.html").pipe(res)
    }
})


/*Sending json object
var server = http.createServer((req,res) => {
    console.log("Requested file: " + req.url)

    res.writeHead(200,{'Content-Type': 'application/json'})

    var myObj = {
        name: "Joel",
        job: "Ninja",
        age: 22
    }
    res.end(JSON.stringify(myObj))
})
*/

/* Sending files
var server = http.createServer((req,res) => {
    console.log("Requested file: " + req.url)

    res.writeHead(200,{'Content-Type': 'text/html'})

    var myReadStream = fs.createReadStream(__dirname + '/index.html','utf8')
    myReadStream.pipe(res)
})
*/

server.listen(3000)
console.log("Server is listening on 3000 port")