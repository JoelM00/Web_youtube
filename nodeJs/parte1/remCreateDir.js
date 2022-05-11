var fs = require('fs')


//Create a directory and save one file
fs.readFile('./lixo.txt','utf8',(err,data) => {
    if (err) {
        console.log("Reading error")
    } else {
        fs.mkdir('./stuff',() => {
            fs.writeFile('./stuff/lixo2.txt',data,(err) => {
                if (err) {
                    console.log("Writing error")
                } else {
                    console.log("Writing completed")
                }
            })
        })
    }
})

//Delete a directory file and remove the directory
fs.unlink('./stuff/lixo2.txt',(err) => {
    if (err) {
        console.log(err)
    } else {
        fs.rmdir('./stuff',(err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Remotion complete")
            }
        })
    }
})