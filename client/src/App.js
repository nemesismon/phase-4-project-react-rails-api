import React, {useEffect, useState} from 'react'
import './App.css';
import Home from './Home'
import Login from './Login'
import UserLists from './UserLists'
import ProjectLists from './ProjectLists'
import NavBar from './NavBar'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  const [sessionUserData, setSessionUserData] = useState(null)
  const [sessionProjData, setSessionProjData] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  
    useEffect(() => {
      fetch('/me')
      .then((r) => {
        if (r.ok) {
          setLoginStatus(true)
          return (r.json())
        }
        throw new Error('Session does not exist')
      })
      .then((data) => setSessionUserData(data))
      .catch((error) => {
        console.log(error)
        setSessionUserData(null)
        setLoginStatus(false)
      })
      console.log(sessionUserData)
    }, [])

  if (loginStatus === false && sessionUserData !== null) {
    return (
      <h4>Loading...</h4>
    )
  } else {
      return (
        <div className="App">
          <header>
            Welcome to Builder Exchange
          </header>
            <div>
              <BrowserRouter>
                <NavBar loginStatus={loginStatus}/>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/userlist" element={<UserLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus}/>} />
                    <Route path="/projectlist" element={<ProjectLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} sessionProjData={sessionProjData} setSessionProjData={setSessionProjData} />} />
                    <Route path="/login" element={<Login sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} setLoginStatus={setLoginStatus} sessionProjData={sessionProjData} setSessionProjData={setSessionProjData}/>} />
                  </Routes>
              </BrowserRouter>
            </div>
        </div>
      )
      }
}

export default App;