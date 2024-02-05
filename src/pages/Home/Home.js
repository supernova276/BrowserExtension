import React from 'react'
import "./Home.css"
import { useBrowser } from '../../context/browserContext'

export const Home = () => {

  const{name,browserDispatch}=useBrowser();

  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  const handleKey=(e)=>{
    if(e.key==="Enter" && e.target.value.length>0){
      browserDispatch({
        type:"NAME",
        payload:e.target.value
      })
      localStorage.setItem("name",e.target.value)
    }

  }
   
  return (
    <div>
        <div className="home-container d-flex flex-column align-items-center justify-content-center gap-lg">
        <h1 className='main-heading'>BrowserExtension</h1>
        <div className='user-details d-flex flex-column align-items-center gap'>
          <span className='heading-1'>Hello whats your name  </span>
          <form onSubmit={handleSubmit}>
            <input className='input' onKeyDown={handleKey} required/>
          </form>
        </div>
        </div>
      
    </div>
  )
}

export default Home
