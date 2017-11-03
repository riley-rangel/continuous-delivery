import React from 'react'

export default function TodoList({ todos }) {
  return (
    <div className='row'>
      <div className='col xl8 l8 m12 s12 push-xl2 push-l2'>
        <div className='row'>
          { todos.map((todo, index) => ListItem(todo, index)) }
        </div>
      </div>
    </div>
  )
}

function ListItem({ task, due }, index) {
  return (
    <div key={ index } className='col xl4 l4 m6 s12 left todo'>
      <div className='card blue-grey darken-1' style={{ 'height': '10rem' }}>
        <div className='card-content center-align white-text'>
          <span className='card-title'>{ task }</span>
          <p>Due by: { due }</p>
        </div>
      </div>
    </div>
  )
}
