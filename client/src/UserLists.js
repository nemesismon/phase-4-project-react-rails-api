import React, { useState } from 'react'
import './UserLists.css'

function UserLists({sessionUserData, loginStatus}) {

    const [userSessionToggle, setUserSessionToggle] = useState(false)
    const [userSession, setUserSession] = useState(null)

    if (userSessionToggle === false && sessionUserData !== null) {
            console.log(sessionUserData.id)
            fetch(`/users/${sessionUserData.id}`)
            .then((r) => r.json())
            .then((data) => setUserSession(data))
            setUserSessionToggle(true)
    }

    const listPunchItems = () => {
        const theList = userSession.punch_items.map((item) => {
            return (
                        <tr key={item.id}>
                            <td>{item.task}</td>
                            <td>{item.area}</td>
                            <td>{item.notes}</td>
                            <td>{item.complete_by}</td>
                            <button>Mark Complete</button>
                        </tr>
            )
        })
        return theList
    }

    const sessionCheck = () => {
        console.log(userSession)
    if (userSessionToggle === false) {
        return (
            <div>
                <p>Unauthorized - please login</p>
            </div>
        )
    } else if (userSession !== null) {
        return (
            <div>
                <h1>Punch List</h1>
                    <h4>Welcome, {userSession.point_of_contact}!</h4>
                    <div>
                        <table align='center'>
                            <tr>
                                <th>Task</th>
                                <th>Area</th>
                                <th>Notes</th>
                                <th>Complete by:</th>
                                <th>Status</th>
                            </tr>
                                {listPunchItems()}
                        </table>
                    </div>
            </div>
        )
    } else {
        return (
            <h4>Loading...</h4>
        )
    }}

    return (
        <div>
            {sessionCheck()}
        </div>
    )
}

export default UserLists