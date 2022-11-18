import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
    return (
        <div>
            <h1>Home</h1>
            <br></br>
            <p>A place to organize and manage your projects.</p>
            <br></br>
            <Link to={'/login'}>Login</Link>
        </div>
    )
}

export default Home