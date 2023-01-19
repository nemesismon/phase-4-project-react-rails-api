import React, { useState } from 'react'
import './UserLists.css'
import './App.css'

function ProjectLists({ sessionUserData, loginStatus, sessionProjData, setSessionProjData, projectErrors, setProjectErrors }) {

    const [createProject, setCreateProject] = useState(false)
    const [projTitle, setProjTitle] = useState('')
    const [projAddress, setProjAddress] = useState('')
    const [projOwnerName, setProjOwnerName] = useState('')
    const [projCompBy, setProjCompBy] = useState(null)

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
            return sessionProjData.map((project) => {
                return (
                    <tr key={project.address}>
                        <td>{project.title}</td>
                        <td>{project.address}</td>
                        <td>{project.owner_name}</td>
                        {project.users.map((user) => {
                                return (
                                    <tr key={Math.round(Math.random()*1000000)}>
                                        <td>{user.company_name}</td>
                                        <td>{user.trade_type}</td>
                                        <td>{user.point_of_contact}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                        )})}
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
                                </tr>
                            {projectsList()}
                            </tbody>
                        </table>
                        {projMessages()}
                    </div>
                </div>
            )
        }

        const handleProjCreate = (e) => {
            e.preventDefault()

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
                    return r.json().then((respData) => {
                        setSessionProjData(respData)
                        setCreateProject(false)
                    })
                } else {
                    return r.json().then((errorData) => {
                        setProjectErrors(errorData)
                    })
                }
        })
            setProjTitle('')
            setProjAddress('')
            setProjOwnerName('')
            setProjCompBy()
        }

        const projMessages = () => {
                if (sessionProjData.length === 0 || sessionProjData === undefined) {
                return (<h5>Please Create Project to begin creating Punch Items</h5>)
            }
        }

        const createProjectForm = () => {
            const showProjectErrors = projectErrors ? projectErrors.error : null
            return (
                <div>
                    <h1>Add New Project</h1>
                    <div align='right'>
                        <input type='button' value='Projects List' onClick={() => {setCreateProject(false); setProjectErrors(null)}}/> 
                    </div>
                    <h5><b>*All fields required</b></h5>
                    <><h5 className='make_red'>{showProjectErrors}</h5></>
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
                 if (createProject === false) {
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