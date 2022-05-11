const mongoose = require('mongoose')

var mailTokenSchema = new mongoose.Schema({
    nome: String,
    password: String,
})

module.exports = mongoose.model('mailToken',mailTokenSchema)