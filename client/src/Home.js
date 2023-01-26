import React from 'react'
import { Link } from 'react-router-dom'

function Home ({ sessionUserData, loginStatus }) {

    const greeting = () => {
        if (loginStatus === true) {
            return (
                <div>
                    <ul></ul>
                        <h4>Welcome, {sessionUserData.point_of_contact}!</h4>
                        <br></br>
                        <p><b>Project Management just got easier.</b></p>
                </div>
            )
        } else {
            return (
                <div>
                    <ul>
                        <p><b>Project Management just got easier.</b></p>
                        <Link to={'/login'}>Login</Link> to get started!
                    </ul>
                </div>
            )
        }}

    return greeting()
}

export default Home