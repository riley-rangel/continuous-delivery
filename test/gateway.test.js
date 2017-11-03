const { expect } = require('chai')
const { before, beforeEach, describe, it, after } = require('mocha')
const createGateway = require('../server/gateway')
const { MongoClient } = require('mongodb')
const uuidv4 = require('uuid/v4')

describe('gateway', () => {

  let db
  let todos
  const id = uuidv4()

  before(done => {
    MongoClient.connect('mongodb://localhost/todos-app-test', (err, _db) => {
      if (err) return done(err)
      db = _db
      todos = createGateway(db.collection('todos'))
      done()
    })
  })

  beforeEach(async () => {
    const todosCollection = db.collection('todos')
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

  describe('create method', () => {

    it('returns newly inserted todo object.', async () => {
      const newTodo = { task: 'study', due: 'later' }
      const created = await todos.create(newTodo)
      expect(created).to.be.an('object')
      expect(Object.keys(created).length).to.equal(4)
      expect(created).to.include(newTodo)
      expect(created).with.a.property('id')
        .which.is.a('string')
        .with.lengthOf(36)
      expect(created).with.a.property('_id')
        .which.is.an('object')
    })

  })

})
