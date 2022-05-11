
const jwt = require('jsonwebtoken')

exports.extrator = (req,res,next) => {
    if (req.cookies.token) {
        next()
    } else {
        return res.status(401).jsonp({erro: "cookie errado"})
    }
}