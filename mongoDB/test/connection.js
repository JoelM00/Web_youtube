const mongoose = require('mongoose')

// ES6 Promises
mongoose.Promise = global.Promise

// Connect to the DB before tests run 
before((done) => {

    // Connect to mongoDB
    mongoose.connect('mongodb://localhost/testaroo')

    mongoose.connection.once('open',() => {
        console.log(' -> Connection has been made, now make fireworks...')
        done()
    }).on('error',(err) => {
        console.log(err)
    })
})

// Drop the characters collection before each test 
beforeEach((done) => {
    //Drop the collection before each test
    mongoose.connection.collections.mariochars.drop(() => {
        done()
    })
})

