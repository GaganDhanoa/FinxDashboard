import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import "./Inventory.css"
import '/src/assets/bootstrap/bootstrap.css'

import Main from './components/Main'
import Navbar from './components/Navbar'
import Footer from './components/Footer'  

import { useState } from 'react'

function App() {
  
  const [mainDisplay, setMainDisplay] = useState("Inventory")

  return (
    <div className='site-container'>
      
      <Navbar setMainDisplay={setMainDisplay}/>
      <div className='site-content'>
        <Main mainDisplay={mainDisplay}/>
      </div>      
      
    </div>
  )
}

export default App
