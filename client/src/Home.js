import React from 'react'
import { Link } from 'react-router-dom'

function Home ({ sessionUserData, setSessionUserData, loginStatus, setLoginStatus }) {

    // if (sessionUserData === null && loginStatus === false) {
    //     fetch('/me')
    //     .then((r) => r.json())
    //     .then((data) => setSessionUserData(data))
    //     setLoginStatus(true)
    // }

    return (
        <div>
            <h1>Home</h1>
            <p>Project Management just got easier.</p>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default Home