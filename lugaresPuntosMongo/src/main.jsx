import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import { LugaresApp } from './LugaresApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <LugaresApp />
    </BrowserRouter>
  // </React.StrictMode>
)
