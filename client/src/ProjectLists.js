import React, {useState} from 'react'
import './UserLists.css'

function ProjectLists({ sessionUserData, setSessionUserData }) {

    const [sessionData, setSessionData] = useState(null)
    const [sessionProject, setSessionProject] = useState(false)
    const [createProject, setCreateProject] = useState(false)

    if (sessionUserData === null) {
        return (
            <p>Loading...</p>
        )
    } else if (sessionUserData !== null && sessionProject === false) {
        fetch('/projects')
        .then((r) => r.json())
        .then((data) => setSessionData(data))
        setSessionProject(true)
    }
    
    const projectsList = () => {
        if (sessionData === null) {
            return (
                <p>Unathorized - please login</p>
            )
        } else if (sessionData !== null && sessionProject === true) {
            const projList = sessionData.map((item) => {
            console.log(item)
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.address}</td>
                    <td>{item.owner_name}</td>
                    {item.users.map((user) => {
                        console.log(user)
                        return (
                            <>
                            <td>{user.company_name}</td>
                            <td>{user.point_of_contact}</td>
                            <td>{user.phone}</td>
                            </>
                        )
                    })}
                    <td>{item.complete_by}</td>
                    <button>Mark Complete</button>
                </tr>
            )
        })
        return projList
        } else {
            return (
                <p>Loading...</p>
            )
        }
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
                    <h1>Project List</h1>
                    <div align='right'>
                    <input type="button" value="Create Project" /> 
                    </div>
                    <br></br>              
                    <div>
                            <table align='center'>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Address</th>
                                    <th>Owner Info</th>
                                    <th>Sub Name</th>
                                    <th>Point of Contact</th>
                                    <th>Phone</th>
                                    <th>Complete by:</th>
                                    <th>Status</th>
                                </tr>
                                {projectsList()}
                            </table>
                        </div>
                </div>
            )
        }}

        const viewToggle = () => {
            if (createProject === false) {
                sessionCheck()
            } else {

            }
        }

        return (
            <>
            {viewToggle()}
            </>
        )   
}

export default ProjectLists