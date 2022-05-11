var express = require('express')
var bodyParser = require('body-parser')

var app = express()

//Middleware a usar para o metodo POST
var urlencodedParser = bodyParser.urlencoded({extended: false})

//Set our view engine
app.set('view engine','ejs')
app.use('/assets',express.static('stuff'))

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/contact',(req,res) => {
    res.render('contact',{qs: req.query})
})

//urlencodedParser permite aceder ao objeto criado com os dados do formulario
app.post('/contact',urlencodedParser,(req,res) => {
    console.log(req.body)
    res.render('contact-success',{data: req.body})
})

app.get('/profile/:name',(req,res) => {
    var data = {age: 20, job: "ninja",hobbies: ['eating','fishing','gaming']}
    res.render('profile',{person: req.params.name,data: data})
})




app.listen(3000)
console.log("Server is listening on 3000 port...")