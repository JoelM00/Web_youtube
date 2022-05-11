var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0731414d2868ea",
      pass: "07886ff74731bd"
    }
});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: '../resources/mail/',
    extName: '.html'
}))


module.exports = transport