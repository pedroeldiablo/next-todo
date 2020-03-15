import Link from 'next/link';
import React, { useReducer, useContext, useEffect, useRef} from 'react';
import styled from 'styled-components'

const Button = styled.button`
margin: 30px;
font-size: 2rem;
border-radius: 20px;
border: 0.5px solid rgba(255, 255, 255, 0.1);
text-align: center;
background-color: #eeeeee;
padding: 5px;
box-shadow: -6px -6px 26px 0 rgba(255, 255, 255, 0.83),  6px 6px 26px 0 rgba(217, 210, 200, 0.51);
`;

const ListBody = styled.div`
  font-family: helvetica;
  font-size: 1.5rem;
  color: #fff;
  background-color:#eeeeee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;


`;

const CheckBox = styled.input`

`;


function appReducer(state, action) {
  switch (action.type) {
    case  'reset': {
      return action.payload;
    }
    case 'add': {
      return [ ...state, {
        id: Date.now(),
        text: '',
        completed: false
      }]
    }
    case 'updatedTodo': {
      return state.map(item => {
        if(item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text
          };
        }
        return item;
      })
    }
    case 'delete': {
      return state.filter(item => item.id !== action.payload);
    }
    case 'completed': {
      return state.map(item => {
        if(item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      })
    }
    default:
     { return state;}
  }
}

const Context = React.createContext();

function useEffectOnce(callback) {
  const didRun = useRef(false);
  
  useEffect(() => {
    if (!didRun.current){
      callback();
      didRun.current = true;

    }
  });
};

export default function Todos() {
  const [state, dispatch] = useReducer(appReducer, []);

  useEffectOnce(() => {
    const raw = localStorage.getItem('data');
    dispatch({type: 'reset', payload: JSON.parse(raw)});  
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <h1>Todos</h1>
      <button onClick={() => dispatch({ type: 'add'})}>Add Todo</button>
     <TodosList items={state} />
    </Context.Provider>
  );
}

function TodosList({ items }) {
  return items.map(item => 
     <TodoItem key={item.id} {...item}/>
  )
}

function TodoItem({ id, completed, text }) {
  const dispatch = useContext(Context);
  return (
      <ListBody
      >
        <CheckBox type="checkbox" checked={completed} onChange={() => dispatch({ type: 'completed', payload: id})} />
        <input type="text" defaultValue={text}  onChange={(evt) => dispatch({ type: 'updatedTodo', payload: {id, text: evt.target.value}})}/>
       <DeleteButton id={id}/>
        <p>{id}</p>
      </ListBody>
  )
  
}

function DeleteButton({id}) {
  const dispatch = useContext(Context);
  return (
  <Button onClick={() => dispatch({ type: 'delete', payload: id})}>Delete</Button>
  )
}
