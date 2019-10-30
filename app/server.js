require('dotenv').config()

const app = require('express')()
var cors = require('cors')
app.use(cors())

const routes = require('./routes')

const port = process.env.PORT || 3000

app.use('/', routes)

app.listen(port)
