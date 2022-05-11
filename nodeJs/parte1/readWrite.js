var fs = require('fs')

fs.readFile('./lixo.txt','utf8',(err,data) => {
    if (err) {
        console.log("Reading error")
    } else {
        fs.writeFile('./lixo2.txt',data,(err) => {
            if (err) {
                console.log("Writing error")
            }
        })
    }
})


console.log("Ola, ma frend!")
