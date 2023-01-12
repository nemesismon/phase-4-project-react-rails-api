import React, {useEffect, useState} from 'react'
import './App.css';
import Home from './Home'
import Login from './Login'
import UserLists from './UserLists'
import ProjectLists from './ProjectLists'
import NavBar from './NavBar'
import {Routes, Route, useNavigate} from 'react-router-dom'

function App() {

  const [sessionUserData, setSessionUserData] = useState(null)
  const [sessionProjData, setSessionProjData] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

    useEffect(() => {
      fetch('/me')
      .then((r) => {
        if (r.ok) {
          return r.json()
        } else {}
        throw new Error('Unauthorized')
      })
      .then((data) => {
        setSessionUserData(data)
        setLoginStatus(true)
        handleGetProjects()
      })
      .catch((error) => {
        setSessionUserData(null)
        setLoginStatus(false)
        navigate('/login')
      })
    }, [])


    const handleGetProjects = () => {
          fetch('/projects')
            .then((r) => {
                if (r.ok) {
                  return r.json()
              }
              throw new Error('Unauthorized')})
            .then((data) => {
              setSessionProjData(data)
            })
            .catch((error) => {
              setSessionProjData(null)
            })
    }

  const execApp = () => {
    return (
      <div className='App'>
        <header>
          Welcome to Builder Exchange
        </header>
          <div>
              <NavBar loginStatus={loginStatus} />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/profile' element={<UserLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus}/>} />
                  <Route path='/projects' element={<ProjectLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} sessionProjData={sessionProjData} setSessionProjData={setSessionProjData} />} />
                  <Route path='/login' element={<Login sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} setLoginStatus={setLoginStatus} sessionProjData={sessionProjData} setSessionProjData={setSessionProjData} handleGetProjects={handleGetProjects}/>} />
                </Routes>
          </div>
      </div>
    )
  }

    return (
      <div>
        {execApp()}
      </div>)

}

export default App;