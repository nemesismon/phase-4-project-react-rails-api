import React from 'react'
import './App.css';
import Home from './Home'
import Login from './Login'
import UserLists from './UserLists'
import ProjectLists from './ProjectLists'
import NavBar from './NavBar'
import {BrowserRouter, Routes, Route,} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header>
      </header>
        <div>
          <BrowserRouter>
            <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/userlist" element={<UserLists />} />
                <Route path="/projectlists" element={<ProjectLists />} />
              </Routes>
          </BrowserRouter>
        </div>
    </div>
  )
}

export default App;