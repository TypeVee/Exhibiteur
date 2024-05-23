import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/header"
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Welcome />}/>
      </Routes>
    </>
  )
}

export default App
