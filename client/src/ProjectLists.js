import React, { useState } from 'react'
import './UserLists.css'

function ProjectLists({ sessionUserData, loginStatus, sessionProjData, setSessionProjData }) {

    const [createProject, setCreateProject] = useState(false)
    const [projSession, setProjSession] = useState(false)
    const [projTitle, setProjTitle] = useState("")
    const [projAddress, setProjAddress] = useState("")
    const [projOwnerName, setProjOwnerName] = useState("")
    const [projCompBy, setProjCompBy] = useState()

    // GETs in APP only, also need to get this information from USER
    const getProjects = () => {
        fetch('/projects')
        .then((r) => r.json())
        .then((data) => setSessionProjData(data))
    }
    
    const projectsList = () => {
        if (sessionProjData === null && loginStatus === true) {
            return (
                <p>Loading...</p>
            )
        } else if (sessionProjData !== null && loginStatus === true) {
            let i = 1
            const projList = sessionProjData.map((item) => {
                //Fix for duplicates
                return (
                    <tbody>
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.address}</td>
                        <td>{item.owner_name}</td>
                        {item.users.map((user) => {
                            //Option for no attached users
                            if (i <= 1) {
                                return (
                                    <>
                                    <td key={i}>{user.company_name}</td>
                                    <td>{user.trade_type}</td>
                                    <td>{user.point_of_contact}</td>
                                    <td>{user.phone}</td>
                                    </>
                                )
                            } else {
                                    return (
                                        <tr key={user.id}>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{user.company_name}</td>
                                            <td>{user.trade_type}</td>
                                            <td>{user.point_of_contact}</td>
                                            <td>{user.phone}</td>
                                        </tr>
                                    )
                            }
                        },
                        i++
                        )}
                        <td>{item.complete_by}</td>
                        {/* <button>Mark Complete</button> */}
                    </tr>
                    </tbody>
                )
            })
            return projList
        }
    }

    const punchList = () => {
            return (
                <div>
                    <h1>Project List</h1>
                    <div align='right'>
                        <input type="button" value="Create Project" onClick={() => setCreateProject(true)}/> 
                    </div>
                    <br></br>      
                    <div>
                        <table align='center'>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Address</th>
                                    <th>Owner Info</th>
                                    <th>Sub Name</th>
                                    <th>Trade</th>
                                    <th>Point of Contact</th>
                                    <th>Phone</th>
                                    <th>Complete by:</th>
                                </tr>
                            {projectsList()}
                        </table>
                    </div>
                </div>
            )
        }

        const handleProjCreate = (e) => {
            e.preventDefault();
            console.log(projTitle, projOwnerName)
            fetch('/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: projTitle,
                    address: projAddress,
                    owner_name: projOwnerName,
                    complete_by: projCompBy,
                })
            })
            .then((r) => r.json())
            .then((data) => setSessionProjData(data))
            setProjTitle("")
            setProjAddress("")
            setProjOwnerName("")
            setProjCompBy()
            setCreateProject(!createProject)
        }

        console.log(sessionProjData)

        const createProjectForm = () => {
            return (
                <div>
                    <h1>Add New Project</h1>
                    <div align='right'>
                        <input type="button" value="Projects List" onClick={() => setCreateProject(false)}/> 
                    </div>
                    <form onSubmit={handleProjCreate}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={projAddress} 
                        onChange={(e) => setProjAddress(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="owner_name"
                        placeholder="Owner Name"
                        value={projOwnerName} 
                        onChange={(e) => setProjOwnerName(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="date"
                        name="complete_by"
                        placeholder="Complete By"
                        value={projCompBy} 
                        onChange={(e) => setProjCompBy(e.target.value)}
                    />
                    <ul></ul>
                    <button type="submit">Submit</button>
                </form>
                </div>
            )
        }

        const viewToggle = () => {
            if (sessionUserData !== null && loginStatus === true) {
                if (projSession === false) {
                    getProjects()
                    setProjSession(true)
                }
                if (createProject === false) {
                    return (
                        <div>
                            {punchList()}
                        </div>
                    )
                } else {
                    return (
                        <div>
                            {createProjectForm()}
                        </div>
                    )
                }
            } else if (loginStatus === false) {
                return (
                    <div>
                        <h4>Unauthorized - please login</h4>
                    </div>
                )
            }
        }

        return (
            <div>
                {viewToggle()}
            </div>
        )   
}

export default ProjectLists