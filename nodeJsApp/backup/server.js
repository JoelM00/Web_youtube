const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res) => {
    
    //lodash
    const num = _.random(0,20);
    console.log(num)

    const greet = _.once(() => {
        console.log("Hello!")
    });

    greet();
    greet();


    console.log("Request made")

    // Set a header type
    res.setHeader('Content-Type','text/html')

    let path = './paginas/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-eu':
            res.statusCode = 301
            res.setHeader('Location','/about')
            res.end()   
            break
        default:
            path += '404.html'
            res.statusCode = 404
            break
    }

    // Envia a pagina html
    fs.readFile(path,(err,data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            //res.write(data)
            res.end(data)
        }
    })
});

server.listen(3000,'localhost',() => {
    console.log("Server listening on port 3000...")
})