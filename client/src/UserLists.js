import React from 'react'
import './UserLists.css'

function UserLists({sessionUserData, loginStatus}) {

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
        if (loginStatus === false) {
            return (
                <h4>Unauthorized - please login</h4>
            )
        } else if (sessionUserData === null && loginStatus === true) {
            return (
                <h4>Loading...</h4>
            )
        } else if (sessionUserData !== null && loginStatus === true) {
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
        <div>
            {sessionCheck()}
        </div>
    )
}

export default UserLists