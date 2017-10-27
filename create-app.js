const express = require('express')

module.exports = function createApp() {
  const app = express()

  app.get('/', (req, res) => {
    const info = {
      name: 'continuous-delivery',
      description: 'A practice repository for testing and deployment.'
    }
    res.status(200).json(info)
  })

  return app
}
