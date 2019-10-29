const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.send('Hello Mobi!')
})

module.exports = routes
