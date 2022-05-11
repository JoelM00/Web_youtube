var Pessoa = require('../models/pessoa')

module.exports.listar = () => {
    return Pessoa
        .find({},{_id: 1, nome: 1, password: 1})
        .exec()
}

module.exports.inserir = (p) => {
    var newPessoa = new Pessoa(p)
    return newPessoa
        .save()
}

module.exports.getByName = (n) => {
    return Pessoa
    .findOne({nome: n},{_id: 1, nome: 1, password: 1})
    .exec()
}

module.exports.getById = (id) => {
    return Pessoa
    .findOne({_id: id},{_id: 1, nome: 1, password: 1})
    .exec()
}

module.exports.updateById = (id,token,data) => {
    return Pessoa
    .updateOne({_id: id},{'$set': {passResetToken: token, passResetExpires: data}})
    .exec()
}