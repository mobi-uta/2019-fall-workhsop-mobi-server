const axios = require('axios')
const cheerio = require('cheerio')

const getHtmlFromURL = async (url) => {
  return axios(url)
    .then(response => {
      const html = response.data
      return html
    })
}

const getHackathons = async () => {
  const url = 'https://mlh.io/seasons/na-2020/events'
  return axios(url)
    .then(async response => {
      const html = await getHtmlFromURL(url)
      const $ = cheerio.load(html)
      const eventsHtml = $('.inner')
      const events = []

      eventsHtml.each(function () {
        const title = $(this).find('.event-name').text()
        const eventLogo = $(this).find('.event-logo').find('img').attr('src')
        const imageWrap = $(this).find('.image-wrap').find('img').attr('src')
        const eventDate = $(this).find('.event-date').text()
        let startAndEndDates = $(this).find('meta').attr('content')
        startAndEndDates = new Date(startAndEndDates)
        const cityAndState = $(this).find('.event-location').find('span').text()
        const city = cityAndState.slice(0, cityAndState.length - 2)
        const state = cityAndState.slice(cityAndState.length - 2)

        const event = {
          title,
          eventLogo,
          imageWrap,
          eventDate,
          startAndEndDates,
          city,
          state
        }
        events.push(event)
      })
      return events
    })
}

module.exports.getHackathons = getHackathons
