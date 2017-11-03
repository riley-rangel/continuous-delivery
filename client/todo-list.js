import React from 'react'

export default function TodoList({ todos }) {
  return (
    <div className='row'>
      <div className='col s8 push-s2'>
        <div className='row'>
          { todos.map((todo, index) => ListItem(todo, index)) }
        </div>
      </div>
    </div>
  )
}

function ListItem({ task, due }, index) {
  return (
    <div key={ index } className='col s4 left todo'>
      <div className='card' style={{ 'height': '10rem' }}>
        <div className='card-content center-align'>
          <h5>{ task }</h5>
          <span>Due by: { due }</span>
        </div>
      </div>
    </div>
  )
}
