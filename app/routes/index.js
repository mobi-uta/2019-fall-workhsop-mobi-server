const {
  getHackathons
} = require('../utility/webscraper')

const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.send('Hello Mobi!')
})

routes.get('/hackathons', async (req, res) => {
  let events = await getHackathons()
  const state = req.query.state ? req.query.state : 'TX'
  console.log(state)
  events = events.filter(event => {
    return event.state.toLowerCase() === state.toLowerCase()
  })
  events.sort((a, b) => {
    return a.startAndEndDates - b.startAndEndDates
  })

  res.send(events)
})

module.exports = routes
