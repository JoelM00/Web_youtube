
const jwt = require('jsonwebtoken')
const hash = require('../config/hash.json')


module.exports = (req,res,next) => {
    const autorizacao = req.cookies.token

    if (!autorizacao) {
        return res.status(401).jsonp({erro: "Nao tem token..."})
    }

    const parts = autorizacao.split('.')

    if (!parts.length == 3) {
        return res.status(401).jsonp({error: "Token desformatado..."})
    }

    jwt.verify(autorizacao,hash.secret,(err,decoded) => {
        if (err) {
            return res.status(401).jsonp({error: "Token invalido..."})
        } else {
            req.userId = decoded.id
            return next()
        }
    })
}