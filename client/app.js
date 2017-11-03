import React, { Component } from 'react'
import TodoForm from './todo-form'
import TodoList from './todo-list'

export default class TodoFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { todos: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newTodo = {
      task: formData.get('task'),
      due: formData.get('due')
    }
    event.target.reset()
    this.addTodo(newTodo)
  }
  async addTodo(newTodo) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
    return response.json()
  }
  render() {
    return (
      <div className='container'>
        <TodoForm handleSubmit={ this.handleSubmit } />
        <TodoList todos={ this.state.todos } />
      </div>
    )
  }
}
