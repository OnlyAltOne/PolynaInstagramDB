const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mongoose = require('./db/mongoose')
const accountRouter = require('./router/accountsRouter')
const usersRouter = require('./router/usersRouter')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/static', express.static('public'))
app.use(accountRouter)
app.use(usersRouter)


app.get('', (req, res) => {
    res.render("index")
})

app.get('/addaccount', (req, res) => {
    res.render('addAccount')
})
app.get('/database', (req, res) => {
    res.render('viewDB')
})

module.exports = app