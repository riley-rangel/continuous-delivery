import React from 'react'

export default function TodoList({ todos }) {
  return (
    <div className='row'>
      <div className='col s10 push-s1'>
        { todos.map((todo, index) => ListItem(todo, index)) }
      </div>
    </div>
  )
}

function ListItem({ task, due }, index) {
  return (
    <div key={ index } className='card col s3 left todo'>
      <h5>{ task }</h5>
      <span>Due by: { due }</span>
    </div>
  )
}
