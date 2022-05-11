var events = require('events')
var util = require('util')

var Person = function(name) {
    this.name = name
}

util.inherits(Person,events.EventEmitter)

var james = new Person('james')
var joel = new Person('joel')
var ana = new Person('ana')
var ryan = new Person('ryan')

var people = [james,joel,ana,ryan]


people.forEach((person) => {
    person.on('speak',(msg) => {
        console.log(person.name + ' said: ' + msg)
    })
})

james.emit('speak','Hey dudes')
ryan.emit('speak','I want a curry')