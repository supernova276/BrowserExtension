import './App.css';
import { useEffect } from 'react';
import {images} from "./db/images"
import { useBrowser } from './context/browserContext';
import {Home,Tasks} from "./pages"

import 'bootstrap/dist/css/bootstrap.min.css';

const index=Math.floor(Math.random()*images.length)
const bgImage=images[index].image

// we have pushded the above line outsie app because whenver child is rerendered the app is also rerRendered

function App() {

  const {name,browserDispatch}=useBrowser();

  useEffect(()=>{
    const userName=localStorage.getItem("name")
    browserDispatch({
      type:"NAME",
      payload:userName
    })

  },[])
  
return(<>
<div className='app' style={{backgroundImage: `url(${bgImage})`}}>
{
  name?<Tasks/>:<Home/>
}
</div>
</>)

}

export default App;
