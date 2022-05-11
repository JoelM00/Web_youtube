var http = require('http')
var fs = require('fs')



var myReadStream = fs.createReadStream(__dirname + '/lixo.txt','utf8')
var myWriteStream = fs.createWriteStream(__dirname + '/lixo3.txt')

//myReadStream.on('data',(chunk) => {
//    myWriteStream.write("\n\nNew chunk received:\n\n"+chunk)
//})

//It makes exactly the same of the last code
myReadStream.pipe(myWriteStream)

