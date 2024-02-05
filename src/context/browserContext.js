import { createContext,useContext, useReducer } from "react";
import { browserReducer } from "../reducer/browserReducer";

const initialvalue={
    name:"",
    time:"",
    message:"",
    task:""
}
const BrowserContext=createContext(initialvalue)

//in order to provide the context
 const BrowserProvider=({children})=>{

    const[{name,time,message,task}, browserDispatch]=useReducer(browserReducer,initialvalue)
    return (
        // this context is provided to the children i.e passesd inside the arrow function
        <BrowserContext.Provider value={{name,time,message,task,browserDispatch}} >
            {/* this value will be provided to the children */}
        {children}
        </BrowserContext.Provider>
    )
 }

 const useBrowser=()=> useContext(BrowserContext)
//  this userbrowser is the custom hook
 export {useBrowser,BrowserProvider}

 //in order to consume the context
 