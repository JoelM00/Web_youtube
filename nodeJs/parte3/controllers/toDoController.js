var bodyParser = require("body-parser")
var mongoose = require("mongoose")

//Connect to database
mongoose.connect('mongodb+srv://user:user@cluster0.ralbf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//Create a schema - This is like a blueprint
var toDoSchema = new mongoose.Schema({
    item: String
})

var ToDo = mongoose.model('Todo',toDoSchema)

//var data = [{item: "get milk"},{item: 'walk dog'},{item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})

module.exports = (app) => {

    app.get('/toDo',(req,res) => {
        console.log("Get received!")
        
        //Get data from mongoDB and pass it to view
        ToDo.find({},(err,data) => {   // {} all objects in the collection
            if (err) throw err
            res.render('toDo',{toDos: data})
        })
    })

    app.post('/toDo',urlencodedParser,(req,res) => {
        console.log("Post received!")

        //Get data from the view and add it to mongoDB
        var newToDo = ToDo(req.body).save((err,data) => {
            if (err) throw err
            console.log("Sending data back to the front-end")
            res.json(data)
        })
    })

    app.delete('/toDo/:item',(req,res) => {
        console.log("Delete received!")

        //Delete the requested item from mongoDB
        ToDo.find({item: req.params.item.replace(/\+/g," ")}).remove((err,data) => {
            if (err) throw err
            console.log("Sending data back to the front-end")
            res.json(data)
        })

        /*Versao sem a DB
        data = data.filter((element) => {
            return element.item.replace( / /g,'+') !== req.params.item //req.params.item e o que vem na url :item
        })
        
        console.log("Sending data back to the front-end")
        res.json(data)
        */
    })
}