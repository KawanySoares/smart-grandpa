const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const { config } = require('dotenv')

config()

var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_TRANSPORT,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS
    }
  });

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
}))

module.exports = transport