const fs = require('fs');

const readStream = fs.createReadStream('./lixo/cinemaATP.json',{encoding: 'utf8'})
const writeStream = fs.createWriteStream('./lixo/lixeira.txt')

/*
readStream.on('data',(chunk) => {
    console.log('----- CHUNK -----')
    console.log(chunk)
    writeStream.write("\n@NEW CHUNK\n")
    writeStream.write(chunk)
})
*/


//pipping
readStream.pipe(writeStream)