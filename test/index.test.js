require('dotenv/config')
const { expect } = require('chai')
const { before, describe, it, after } = require('mocha')
const createApp = require('../create-app')
const request = require('request')

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

    it('responds with json including repo name and description', done => {
      request('http://localhost:3000/', (error, response, body) => {
        const testRes = '"Name: continuous-delivery ' +
         'Description: A practice repository for testing and deployment."'
        expect(error).to.equal(null)
        expect(response.statusCode).to.equal(200)
        expect(body).to.be.a('string')
          .which.equals(testRes)
        done()
      })
    })

  })

})
