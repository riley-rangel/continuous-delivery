require('dotenv/config')
const { expect } = require('chai')
const { before, beforeEach, describe, it, after } = require('mocha')
const createApp = require('../create-app')
const request = require('request')
const createGateway = require('../gateway')
const { MongoClient } = require('mongodb')
const uuidv4 = require('uuid/v4')

describe('app', () => {

  let server
  const app = createApp()

  before(done => {
    server = app.listen(process.env.PORT, () => done())
  })

  after(done => {
    server.close(() => done())
  })

  describe('GET: "/"', () => {

    it('sends an object with repo name, description, and link', done => {
      request('http://localhost:3000/', (error, response, body) => {
        const testRes = {
          name: 'continuous-delivery',
          description: 'A practice repository for testing and deployment.',
          repo: 'https://github.com/riley-rangel/continuous-delivery'
        }
        expect(error).to.equal(null)
        expect(response.statusCode).to.equal(200)
        expect(JSON.parse(body)).to.be.an('object')
          .which.deep.equals(testRes)
        done()
      })
    })

  })

})

describe ('gateway', () => {

  let db
  let todos
  const id = uuidv4()

  before(done => {
    MongoClient.connect('mongodb://localhost/todos-app', (err, _db) => {
      if (err) return done(err)
      db = _db
      todos = createGateway(db.collection('todos'))
      done()
    })
  })

  beforeEach(async () => {
    const todosCollection = db.collection ('todos')
    await todosCollection.deleteMany()
    await todosCollection.insertOne({ id, task: 'finish project', due: new Date() })
  })

  after(done => {
    db.close(() => done())
  })


  describe('find method', () => {

    it('returns array of records that match "filter" object (if any)', async () => {
      const found = await todos.find()
      expect(found).to.be.an('array')
      expect(found.length).to.equal(1)
      expect(Object.keys(found[0]).length).to.equal(4)
      expect(found[0]).to.include.a.property('id')
        .which.equals(id)
      expect(found[0]).to.include.a.property('task')
        .which.equals('finish project')
      expect(found[0]).to.include.a.property('due')
        .which.is.a('date')
        
      const notFound = await todos.find({ task: 'game on' })
      expect(notFound).to.deep.equal([])
    })

  })

})
