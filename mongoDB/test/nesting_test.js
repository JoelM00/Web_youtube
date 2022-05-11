const assert = require('assert')
const mongoose = require('mongoose')
const Author = require('../models/author')

// Describe our tests
describe('Nesting records',() => {

    beforeEach((done) => {
        mongoose.connection.collections.authors.drop(() => {
            done()
        })
    })

    //Create tests
    it('Creates an author with sub-documents',(done) => {
        var pat = new Author({
            name: 'Joel Martins',
            books: [{
                title: "Name of the book",
                pages: 4000
            }]
        })

        pat.save().then(() => {
            Author.findOne({name: "Joel Martins"}).then((record) => {
                assert(record.books.length === 1)
                done()
            })
        })
    })

    it('Adds a book to an author',(done) => {
        var pat = new Author({
            name: 'Joel Martins',
            books: [{
                title: "Name of the book",
                pages: 4000
            }]
        })

        pat.save().then(() => {
            Author.findOne({name: "Joel Martins"}).then((record) => {
                
                //Add a book to the books array 
                record.books.push({title: 'Outro livro aleatorio',pages: 203})
                record.save().then(() => {
                    Author.findOne({name: 'Joel Martins'}).then((result) => {
                        assert(result.books.length === 2)
                        done()
                    })
                })
            })
        })
    })
})
