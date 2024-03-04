import React, { Fragment, useEffect, useState } from 'react'
import "./Tasks.css"
import { useBrowser } from '../../context/browserContext'
import{quotes} from "../../db/quotes"
import Todo from "../../components/Todo/Todo"

const index=Math.floor(Math.random()*quotes.length)
const quote=quotes[index].quote;

export const Tasks = () => {
    const {time,name,message,task,browserDispatch}=useBrowser()

    const[isChecked,setChecked]=useState(false)
    const[isTodoOpen,setTodoOpen]=useState(false)

    useEffect(()=>{

    const userChecked=localStorage.getItem("checkedStatus")
    if(userChecked==="true")setChecked(true)
    else setChecked(false)

    },[])

    // useeffect is also used to get the values from the local storage
    useEffect(()=>{

        const userTask=localStorage.getItem("task")
        browserDispatch({
            type:"TASK",
            payload:userTask
        })
        const today=new Date()
        if(today.getDate()!== Number(localStorage.getItem("date"))){
          localStorage.removeItem("task")
          localStorage.removeItem("checkedStatus")
          localStorage.removeItem("date")
        }

    },[])


    useEffect(()=>{
        getCurrentTime()
    },[time])

    const getCurrentTime=()=>{
        const today=new Date();
        const hours=today.getHours();
        const minutes=today.getMinutes();

        const hour=hours<10?`0${hours}`:hours
        const minute=minutes<10?`0${minutes}`:minutes

        const currentTime=`${hour}:${minute}`
        setTimeout(getCurrentTime,1000)
        browserDispatch({
        type:"TIME",
        payload:currentTime
       })

       browserDispatch({
        type:"MESSAGE",
        payload:hours
       })
           
    }

    const handleTaskChange=(e)=>{
       if(e.key==="Enter" && e.target.value.length>0){
        browserDispatch({
            type:"TASK",
            payload:e.target.value
           })
        localStorage.setItem("task",e.target.value)
        const today=new Date()
        localStorage.setItem("date",today.getDate())
       }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const hadleCompleteTaskChange=(e)=>{
            setChecked(previousValue=>!previousValue)
      localStorage.setItem("checkedStatus",!    isChecked)
    }
    const handleDeleteTask=()=>{
        browserDispatch({
            type:"DELETE"
        })
        setChecked(false)
        localStorage.removeItem("task")
        localStorage.removeItem("checkedStatus")
    }

    const handleTodoClick=()=>{
         
      setTodoOpen(previousState=>!previousState)
    }

  return (
    <div className='task-container d-flex flex-column align-items-center gap'>
      <span className='time'>{time}</span>
      <span className='message'>{message},{name}</span>
      {name!=="" && task===null ? ( <Fragment>
        <span className='focus-question'>what is your main focus today?</span>
        <form onSubmit={handleSubmit}>
            <input className='input task-input cursor' required onKeyDown={handleTaskChange}/>
        </form>
      </Fragment>):( <div className='user-task-container'>
        <span className='heading-2'>Today's Focus</span>
        <div className='d-flex flex-row align-items-center gap'>
            <label  className= {` ${isChecked?"strike-through ":""}heading-3 d-flex gap-sm align-center`}> <input type="checkbox" 
            className='check cursor' onChange={hadleCompleteTaskChange} checked={isChecked}/>{task}</label>
            <button className='button cursor' onClick={handleDeleteTask}><span className="material-symbols-outlined">close</span></button>
        </div>
      </div>)}

      <div className='quote-container'>
        <span className='heading-3'>{quote}</span>
      </div>
      
      <div className='todo-button-container'>
      {isTodoOpen? <Todo/>: ""}
      <button className='todo-button cursor' onClick={handleTodoClick}>ToDo</button>
      </div>
    </div>
  )
}

export default Tasks
