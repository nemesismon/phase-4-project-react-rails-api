import React from 'react'

function UserLists({sessionUserData}) {

console.log(sessionUserData)

    if (sessionUserData === null) {
        return (
            <p>Please login</p>
        )
    } else {
        return (
            <div>
                <h1>User Lists</h1>
                <br></br>
                <p>Welcome, {sessionUserData.point_of_contact}</p>
                <br></br>
            </div>
        )
    }
}

export default UserLists