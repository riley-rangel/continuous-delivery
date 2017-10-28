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
