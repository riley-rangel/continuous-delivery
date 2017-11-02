const express = require('express')
const bodyParser = require('body-parser')

module.exports = function createApp(gateway) {
  const app = express()

  app
    .use(bodyParser.json())
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
    .post('/todos', async (req, res) => {
      const { task, due } = req.body
      try {
        const created = await gateway.create({ task, due })
        res.status(201).json(created)
      }
      catch (error) {
        console.error(error)
        res.sendStatus(500)
      }
    })

  return app
}
