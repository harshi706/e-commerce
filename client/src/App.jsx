import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from './components/TopBar.jsx'
import Navbar from './components/Navbar.jsx'


function App() {

  return (
    <>
    <TopBar/>
    <BrowserRouter>
        <Navbar/>
    </BrowserRouter>
    </>
  )
}

export default App
