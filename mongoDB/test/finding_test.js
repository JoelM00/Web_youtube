const assert = require('assert')
const MarioChar = require('../models/mariochar')

//Describe tests
describe("Finding records",() => {

    var char

    beforeEach((done) => {
        char = new MarioChar({
            name: 'Mario',
            weight: 23
        })
    
        char.save().then(() => {
            done()
        })
    })
    
    //Create tests
    it('Finds one record from the database',(done) => {
        
        MarioChar.findOne({
            name: 'Mario'
        }).then((result) => {
            assert(result.name === 'Mario')
            done()
        })
    })

    it('Finds one record by ID from the database',(done) => {
        
        MarioChar.findOne({
            _id: char._id
        }).then((result) => {
            assert(result._id.toString() === char._id.toString())
            done()
        })
    })
})