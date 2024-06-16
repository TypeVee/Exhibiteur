import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome";
import Search from "./components/searchResults";
import Lists from "./components/myLists";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/Exhibiteur/" element={<Welcome />} />
        <Route path="/search" element={<Search />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </>
  );
}

export default App;
