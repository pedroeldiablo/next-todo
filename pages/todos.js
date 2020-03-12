import Link from 'next/link';
import React, { useReducer} from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return [ ...state, {
        id: Date.now(),
        text: '',
        completed: false
      }]
    }
    default:
     { return state;}
  }
}

export default function Todos() {
  const [state, dispatch] = useReducer(appReducer, []);
  return (
    <div>
      <h1>Todos</h1>
      <button onClick={() => dispatch({ type: 'add'})}>Add Todo</button>
     <TodosList items={state} />
    </div>
  );
}

function TodosList({ items }) {
  return items.map(item => 
     <TodoItem key={item.id} {...item}/>
  )
}

function TodoItem({ id }) {
  return (
      <div>{id}</div>
  )
  
}
