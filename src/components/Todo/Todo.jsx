import React, { useEffect, useState } from 'react'
import{v4 as uuid} from "uuid";
import  "./Todo.css"
import { useBrowser } from '../../context/browserContext';

export const Todo = () => {

    const[todo,setTodo]=useState("")
    const[todoList,setTodoList]=useState([])
    const{browserDispatch}=useBrowser()

    const handleTodoChange=(e)=>{
     
        setTodo(e.target.value)
       

    }

  useEffect(()=>{
    const userTodo=JSON.parse(localStorage.getItem("todo"))
    userTodo && setTodoList(userTodo)

  },[])

    const handleTodoEnterKey=(e)=>{

        if(e.key==="Enter"){
        const updateTodoList=[...todoList,{id:uuid(),todo,isCompleted:false}]
        setTodoList(updateTodoList)
        setTodo('');
        localStorage.setItem("todo",JSON.stringify(updateTodoList))
        }

        console.log("todolist",todoList)
    }

    const handleTodoCheckChange=(todoId)=>{
        const updateTodoList=todoList.map(todo=>todoId===todo._i?{...todo,isCompleted: !todo.isCompleted}:todo)
        setTodoList(updateTodoList)
        localStorage.setItem("todo",JSON.stringify(updateTodoList))
        
    }
    const handleDeleteTask=(todoId)=>{
       const updateTodoList=todoList.filter( (todo)=>todo._id!==todoId)
       setTodoList(updateTodoList)
    //    the todo list will be updated on the next render
       localStorage.setItem("todo",JSON.stringify(updateTodoList))
    }

  return (
    <div className=' d-flex flex-column align-items-center todo-container'>
        <div className='todo-input-container'>
            <input value={todo} onChange={handleTodoChange} onKeyDown={handleTodoEnterKey} className='todo-input'/>
        </div>
      <div className='todo-list'>
        {
            todoList&& todoList.map(({todo,_id,isCompleted})=>{
                 return (
                    <div key={_id} className='todo-items d-flex flex-row'>
                        <label className={` ${isCompleted? "strike-through " : ""}todo-label`} onChange={()=>handleTodoCheckChange(_id)}>
                            <input type="checkbox" className='todo-check' checked={isCompleted}/>{todo}</label>
                        <button className='button cursor' onClick={()=>handleDeleteTask(_id)}><span className="material-symbols-outlined">close</span></button>
                    </div>
                 )
            })
        }
      </div>
    </div>
  )
}

export default Todo
