require('dotenv').config()

const app = require('express')()
const routes = require('./routes')

const port = process.env.PORT || 3000

app.use('/', routes)

app.listen(port)
