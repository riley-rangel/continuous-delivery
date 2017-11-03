import React from 'react'

export default function TodoForm({ handleSubmit }) {
  return (
    <div className='row' id='todo-form'>
      <form onSubmit={ handleSubmit } className='col s8 push-s2 card'>
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
