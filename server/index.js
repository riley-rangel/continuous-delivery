require('dotenv/config')
const createApp = require('./create-app')
const { MongoClient } = require('mongodb')
const createGateway = require('./gateway')

MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) return console.error(err)
  const todos = createGateway(db.collection('todos'))
  const app = createApp(todos)
  app.listen(process.env.PORT, console.log('Listening:', process.env.PORT))
})
