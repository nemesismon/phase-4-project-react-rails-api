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
  const [projectErrors, setProjectErrors] = useState()
  const navigate = useNavigate()

    useEffect(() => {
      fetch('/me')
      .then((r) => {
        if (r.ok) {
          return r.json().then((respData) => {
            setSessionUserData(respData)
            setLoginStatus(true)
            handleGetProjects()  
          })
        } else {
          return r.json().then((errorData) => {
            setSessionUserData(null)
            setLoginStatus(false)
            navigate('/login')    
          })
        }
    })
  }, [])


    const handleGetProjects = () => {
          fetch('/projects')
            .then((r) => {
                if (r.ok) {
                  return r.json().then((respData) => {
                    setSessionProjData(respData)
                  })
                } else {
                  return r.json().then((errorData) => {
                    setProjectErrors(errorData)
                    setSessionProjData(null)
                  })
                }
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
                  <Route path='/profile' element={<UserLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} sessionProjData={sessionProjData}/>} />
                  <Route path='/projects' element={<ProjectLists sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} loginStatus={loginStatus} sessionProjData={sessionProjData} setSessionProjData={setSessionProjData} projectErrors={projectErrors} setProjectErrors={setProjectErrors}/>} />
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