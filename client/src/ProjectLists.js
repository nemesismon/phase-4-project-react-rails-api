import React, { useState } from 'react'
import './UserLists.css'
import './App.css'

function ProjectLists({ sessionUserData, setSessionUserData, loginStatus, sessionProjData, projectErrors, setProjectErrors, handleGetProjects }) {

    const [createProject, setCreateProject] = useState(false)
    const [projTitle, setProjTitle] = useState('')
    const [projAddress, setProjAddress] = useState('')
    const [projOwnerName, setProjOwnerName] = useState('')
    const [projCompBy, setProjCompBy] = useState()

    console.log(sessionUserData)

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
                    handleGetProjects()
                    setCreateProject(false)
                    setProjTitle('')
                    setProjAddress('')
                    setProjOwnerName('')
                    setProjCompBy()            
                })
            } else {
                return r.json().then((errorData) => {
                    setProjectErrors(errorData)
                })
            }
    })
    }

    const projectsList = () => {
        if (sessionUserData === null) {
            return (
                <p>Please login</p>
            )            
        } else if (sessionUserData === null && loginStatus === true) {
            return (
                <p>Loading...</p>
            )
        } else if (sessionUserData !== null && sessionUserData !== undefined && loginStatus === true) {
            // debugger
            //problem is that the punch items are being udpdated so the project isn;t there yet to render
            return sessionUserData.projects.map((project) => {
                return (
                    <tr key={project.address}>
                        <td>{project.title}</td>
                        <td>{project.address}</td>
                        <td>{project.owner_name}</td>
                        <td>{project.complete_by}</td>
                    </tr>
                )
            })
        }
    }

    const projectsView = () => {
            return (
                <div>
                    <h1>{sessionUserData.point_of_contact} Project List</h1>
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
                                    <th>Complete By:</th>
                                </tr>
                            {projectsList()}
                            </tbody>
                        </table>
                        {projMessages()}
                    </div>
                </div>
            )
        }

        const projMessages = () => {
                if (sessionProjData === undefined) {
                return (<h5>Please Create Project to begin creating Punch Items</h5>)
            }
        }

        const createProjectForm = () => {
            const showProjectErrors = projectErrors ? <h5 className='make_red'>{
                        projectErrors.errors.map((error) => {
                            return (<li key={error}>{error}</li>)
                    })}</h5> : null
            return (
                <div>
                    <h1>Add New Project</h1>
                    <div align='right'>
                        <input type='button' value='Projects List' onClick={() => {setCreateProject(false); setProjectErrors(null)}}/> 
                    </div>
                    <h5><b>*All fields required</b></h5>
                    {showProjectErrors}
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