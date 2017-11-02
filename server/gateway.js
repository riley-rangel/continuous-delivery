const uuidv4 = require('uuid/v4')

module.exports = function createGateway(collection) {
  return {
    async find(filter = {}) {
      const found = await collection.find(filter).toArray()
      return found
    },
    async findById(id) {
      const found = await collection.findOne({ id })
      return found
    },
    async create(newTodo) {
      const todo = Object.assign({ id: uuidv4() }, newTodo)
      const created = await collection.insertOne(todo)
      return created.result
    },
    async updateById(id, update) {
      if (Object.keys(update).includes('id')) return
      const updated = await collection.updateOne({ id }, { $set: update })
      return updated.result
    },
    async deleteById(id) {
      const deleted = await collection.deleteOne({ id })
      return deleted
    }
  }
}
