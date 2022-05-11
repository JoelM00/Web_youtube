const assert = require('assert')
const MarioChar = require('../models/mariochar')

//Describe tests
describe("Deleting records",() => {

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
    it('Deletes one record from the database',(done) => {
        MarioChar.findOneAndRemove({
            name: "Mario"
        }).then(() => {
            MarioChar.findOne({
                name: "Mario"
            }).then((result) => {
                assert(result === null)
                done()
            })
        })
    })
})