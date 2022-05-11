const assert = require('assert')
const MarioChar = require('../models/mariochar')

//Describe tests
describe("Updating records",() => {

    var char

    beforeEach((done) => {
        char = new MarioChar({
            name: 'Mario',
            weight: 50
        })
    
        char.save().then(() => {
            done()
        })
    })
    
    //Create tests
    it('Updates one record in the database',(done) => {
        MarioChar.findOneAndUpdate({
            name: 'Mario'
        },{
            name: 'Joel'
        }).then(() => {
            MarioChar.findOne({
                _id: char._id
            }).then((result) => {
                assert(result.name === 'Joel')
                done()
            })
        })
    })

    it('Increments the weight by 1',(done) => {
        MarioChar.update({},{ $inc: { weight: 1 }})
        .then(() => {
            MarioChar.findOne({name: 'Mario'})
                .then((record) => {
                    assert(record.weight === 51);
                    done()
            })
        })
    })
})