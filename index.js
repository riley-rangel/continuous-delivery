require('dotenv/config')
const express = require('express')

const app = express()

app
  .get('/', (req, res) => {
    res.status(200).json('Name: continuous-delivery ' + 
      'Description: A practice repository for testing and deployment.')
  })
  .listen(process.env.PORT, console.log('Listening:', process.env.PORT))
