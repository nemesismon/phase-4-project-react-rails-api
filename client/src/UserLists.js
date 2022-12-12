import React, { useState } from 'react'
import './UserLists.css'

function UserLists({sessionUserData, setSessionUserData, loginStatus}) {

    // const [userListItems, setUserListItems] = useState(null)
    const [sessionToggle, setSessionToggle] = useState(false)

    if (loginStatus === false) {
        return (
            <p>Unauthorized - please login</p>
        )}
    else if (sessionUserData !== null && sessionToggle === true) {
            console.log(sessionUserData)
            fetch(`/users/${sessionUserData.id}`)
            .then((r) => r.json())
            .then((data) => setSessionUserData(data))
            setSessionToggle(true)
    } else {
        return (
            <p>Loading...</p>
        )
    }

    const listPunchItems = () => {
        const theList = sessionUserData.punch_items.map((item) => {
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
    if (sessionUserData === null) {
        return (
            <div>
                <p>Unauthorized - please login</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Punch List</h1>
                    <h4>Welcome, {sessionUserData.point_of_contact}!</h4>
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
    }}

    return (
        <>
        {sessionCheck()}
        </>
    )
}

export default UserLists