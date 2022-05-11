var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

var Pessoa = require('../controllers/pessoa')
const hash = require('../config/hash.json');
const autenticacao = require('../middlewares/autenticacao');
const mailer = require('./mailer')

function geraToken(parametros) {
  return jwt.sign(parametros,hash.secret,{expiresIn: 86400})
}

router.post("/registar",(req,res) => {
  const pessoa = req.body
  if (pessoa.nome == '' || pessoa.password == '') {
    res.status(200).jsonp({erro: "Credenciais incompletas..."})
  } else {
    var erro = false
    Pessoa.listar()
    .then(dados => {
      dados.forEach(p => {
        if (p.nome == pessoa.nome) {
          res.status(200).jsonp({erro:"Nome em uso..."})
          erro = true
        } 
      })
      if (!erro) {
        const salt = bcrypt.genSaltSync()
        pessoa.password = bcrypt.hashSync(pessoa.password,salt)
        Pessoa.inserir(pessoa)
        .then(user => {
          login = {
            nome: user.nome,
            token: geraToken({ id: user._id })
          }

          res.cookie("token",login.token, {
            httpOnly: true
          })

          res.status(200).jsonp(login)
        })
        .catch(err => res.render('error', { error: err }))
      }
    })
    .catch(err => res.render('error', { error: err }))
  }
})

router.post("/login",(req,res) => {
  const pessoa = req.body
  if (!pessoa.nome || !pessoa.password) {
    res.status(200).jsonp({erro: "Credenciais incompletas..."})
  } else {
    Pessoa.getByName(pessoa.nome)
    .then(dados => {
      if (dados != undefined) {
        if (bcrypt.compareSync(pessoa.password,dados.password)) {
          
          login = {
            nome: dados.nome,
            token: geraToken({ id: dados._id })
          }

          res.cookie("token",login.token, {
            httpOnly: true
          })

          res.status(200).jsonp(login)
        } else {
          res.status(200).jsonp({erro: "Password incorreta..."})
        }
      } else {
        res.status(200).jsonp({erro: "Nao existe esse nome..."})
      }
    })
    .catch(err => res.render('error', { error: err }))
  }
})

router.post("/logout",(req,res) => {
  res.clearCookie("token")
  res.status(200).jsonp({msg: "Logout efetuado..."})
})

router.post('/recuperar',(req,res) => {
  const nome = req.body.nome
  Pessoa.getByName(nome)
  .then(dados => {
    if (dados == undefined) {
      res.status(200).jsonp({erro: "Nome inexistente..."})
    } else {
      const token = crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      Pessoa.updateById(dados._id,token,now) 
      .then(dados => {

        mailer.sendMail({
          to: 'jsmartins2000@hotmail.com',
          from: 'jsmartins2000@hotmail.com',
          template: './recuperar',
          context: {token},
        }, (err) => {
          if (err) {
            console.log(err)
          } else {
            res.send(200)
          }
        })
      })
      .catch(err => console.log(err))

    }
  })
  .catch(err => {})
})


router.get("/",autenticacao,(req,res) => {
  Pessoa.getById(req.userId)
  .then(dados => {
    res.status(200).jsonp(dados)
  })
  .catch(err => res.render('error', { error: err }))
})

router.get("/registar",(req,res) => {
  res.render('registar');
})

router.get("/login",(req,res) => {
  res.render('login');
})

router.get("/logout",(req,res) => {
  res.render('logout');
})


module.exports = router;
