import React, {useEffect, useState} from 'react'
import './App.css';
import Home from './Home'
import Login from './Login'
import UserLists from './UserLists'
import ProjectLists from './ProjectLists'
import NavBar from './NavBar'
import {BrowserRouter, Routes, Route,} from "react-router-dom"

function App() {

  const [sessionUserData, setSessionUserData] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  
  useEffect(() => {
    fetch('/me')
    .then((r) => r.json())
    .then((data) => setSessionUserData(data))
    setLoginStatus(true)
  }, [])

  console.log(sessionUserData)

  return (
    <div className="App">
      <header>
        Welcome to Builder Exchange
      </header>
        <div>
          <BrowserRouter>
            <NavBar />
              <Routes>
                <Route path="/" element={<Home sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>} />
                <Route path="/userlist" element={<UserLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData}/>} />
                <Route path="/projectlist" element={<ProjectLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData}/>} />
                <Route path="/login" element={<Login sessionUserData={sessionUserData} setSessionUserData={setSessionUserData}/>} />
              </Routes>
          </BrowserRouter>
        </div>
    </div>
  )
}

export default App;