import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/header"
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome'
import Search from './components/searchResults'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </>
  )
}

export default App
