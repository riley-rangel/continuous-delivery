import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    return response.json()
  }
  render() {
    return (
      <div className='row' id='todo-form'>
        <form onSubmit={ this.handleSubmit } className='col s8 push-s2 card'>
          <div className='row'>
            <div className='input-field col s5 push-s1'>
              <h5 htmlFor='task'>New Item: </h5>
              <input
                placeholder='What to do...'
                id='task'
                name='task'
                type='text' />
            </div>
            <div className='input-field col s5 push-s1 left'>
              <h5 htmlFor='task'>Due Date: </h5>
              <input
                placeholder='When to do...'
                id='due'
                name='due'
                type='date' />
            </div>
          </div>
          <div className='row'>
            <button className='btn col s2 push-s5'>Save</button>
          </div>
        </form>
      </div>
    )
  }
}
