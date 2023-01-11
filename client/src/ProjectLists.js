import React, { useState } from 'react'
import './UserLists.css'

function ProjectLists({ sessionUserData, loginStatus, sessionProjData, setSessionProjData }) {

    const [createProject, setCreateProject] = useState(false)
    const [projTitle, setProjTitle] = useState('')
    const [projAddress, setProjAddress] = useState('')
    const [projOwnerName, setProjOwnerName] = useState('')
    const [projCompBy, setProjCompBy] = useState()

    // if (sessionUserData !== null) {
    //     setSessionProjData(sessionUserData.punch_items)
    // }
    // debugger

    const projectsList = () => {
        if (sessionUserData === null) {
            return (
                <p>Please login</p>
            )            
        } else if (sessionProjData === null && loginStatus === true) {
            return (
                <p>Loading...</p>
            )
        } else if (sessionProjData !== null && loginStatus === true) {
            // debugger
            return sessionProjData.map((project) => {
                //Option for no attached users
                return (
                    <tr key={project.address}>
                        <td>{project.title}</td>
                        <td>{project.address}</td>
                        <td>{project.owner_name}</td>
                        {project.users.map((user) => {
                            // if (i <= 1) {
                                // debugger
                                return (
                                    <tr key={Math.round(Math.random()*1000000)}>
                                        <td>{user.company_name}</td>
                                        <td>{user.trade_type}</td>
                                        <td>{user.point_of_contact}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                        )})}
                        <td>{project.complete_by}</td>
                        {/* <button>Mark Complete</button> */}
                    </tr>
                )
            })
        }
    }

    const projectsView = () => {
            return (
                <div>
                    <h1>Project List</h1>
                    <div align='right'>
                        <input type='button' value='Create Project' onClick={() => setCreateProject(true)}/> 
                    </div>
                    <br></br>      
                    <div>
                        <table align='center'>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        const handleProjCreate = (e) => {

            if (projTitle || projAddress || projOwnerName || projCompBy === null || undefined) {
                setCreateProject(false)
                return
            }

            e.preventDefault();
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
            .then((r) => {
                if (r.ok) {
                    return(r.json())
                }
                throw new Error('Unable to create project')
            })
            .then((data) => setSessionProjData(data))
            .catch((error) => error)
            setProjTitle('')
            setProjAddress('')
            setProjOwnerName('')
            setProjCompBy()
            setCreateProject(false)
        }

        const createProjectForm = () => {
            return (
                <div>
                    <h1>Add New Project</h1>
                    <div align='right'>
                        <input type='button' value='Projects List' onClick={() => setCreateProject(true)}/> 
                    </div>
                    <form onSubmit={handleProjCreate}>
                    <input
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='address'
                        placeholder='Address'
                        value={projAddress} 
                        onChange={(e) => setProjAddress(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='owner_name'
                        placeholder='Owner Name'
                        value={projOwnerName} 
                        onChange={(e) => setProjOwnerName(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='date'
                        name='complete_by'
                        placeholder='Complete By'
                        value={projCompBy} 
                        onChange={(e) => setProjCompBy(e.target.value)}
                    />
                    <ul></ul>
                    <button type='submit'>Submit</button>
                </form>
                </div>
            )
        }

        const execProjects = () => {
            if (loginStatus === true) {
                if (sessionProjData === null) {   
                    return (
                        <h4>There are currently no projects</h4>
                    )                 
                }
                else if (createProject === false) {
                    return (
                        <div>
                            {projectsView()}
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
                {execProjects()}
            </div>
        )   
}

export default ProjectLists