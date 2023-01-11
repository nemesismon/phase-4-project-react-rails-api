import React, {useEffect, useState} from 'react'
import './App.css';
import Home from './Home'
import Login from './Login'
import UserLists from './UserLists'
import ProjectLists from './ProjectLists'
import NavBar from './NavBar'
import {Routes, Route, useNavigate} from 'react-router-dom'

function App() {

  // RESTful routes! Ensure they are like the photo Nancy provided https://miro.medium.com/max/4800/1*pv-pmMPED1XuTtWlHd6b1g.webp
  // Active Record methods, options, and queries depending on the association type (active record assocations chapter 4 - has many:) - Lugo url
    // AR needs to do as much work as possible!
  // Each back end process needs to check valid user session
  // Double check that all state is changed through FE not via response from server
  // hub for state to drive components - one time GET fetches in APP, in component only for specialized requests


  const [sessionUserData, setSessionUserData] = useState(null)
  const [sessionProjData, setSessionProjData] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  const [projectsGet, setProjectsGet] = useState(false)
  const navigate = useNavigate()

    // make this get also work out the user's project list

    useEffect(() => {
      fetch('/me')
      .then((r) => {
        if (r.ok) {
          return r.json()
        }
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
      // useEffect(() => {
          fetch('/projects')
            .then((r) => {
                if (r.ok) {
                  return r.json()
              }
              throw new Error('Unauthorized')})
            .then((data) => {
              setSessionProjData(data)
              setProjectsGet(true)
            })
            .catch((error) => {
              setSessionProjData(null)
              setProjectsGet(false)
            })
      // }, [])
    }


  // console.log(sessionUserData)
  // console.log(sessionProjData)

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