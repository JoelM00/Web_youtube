const mongoose = require('mongoose')

var pessoaSchema = new mongoose.Schema({
    nome: String,
    password: String,
    passResetToken: String,
    passResetExpires: Date,
})

module.exports = mongoose.model('pessoa',pessoaSchema)