const fs = require('fs')

/*
//reading files
fs.readFile('./lixo/lixo.txt',(err,data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data.toString())
    }
});

console.log('Ultima linha')

//writing files
fs.writeFile('./lixo/lixo.txt','Hello, World',() => {
    console.log("O ficheiro foi escrito")
})
*/

if (!fs.existsSync("./teste")) {
    fs.mkdir("./teste",(err) => {
        if (err) {
            console.log("Erro!")
        }
        console.log("Pasta criada!")
    })
}

// Deleting files 
if (fs.existsSync("./teste")) {
    fs.rmdir("./teste",(err) => {
        if (err) {
            console.log("Erro")
        }
        console.log("Pasta removida!")
    })
}