var express = require('express')
var toDoController = require('./controllers/toDoController')

//Create the app
var app = express()

//Set up template engine
app.set('view engine','ejs')

//Static files 
app.use(express.static('./public'))

//Fire controllers
toDoController(app)


//Listen to port
app.listen(5000)
console.log("Server is listening on port 5000...")