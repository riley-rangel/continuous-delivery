const express = require('express')

module.exports = function createApp(gateway) {
  const app = express()

  app
    .get('/', (req, res) => {
      const info = {
        name: 'continuous-delivery',
        description: 'A practice repository for testing and deployment.',
        repo: 'https://github.com/riley-rangel/continuous-delivery'
      }
      res.status(200).json(info)
    })
    .get('/todos', async (req, res) => {
      const found = await gateway.find()
      res.status(200).json(found)
    })

  return app
}
