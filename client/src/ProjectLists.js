import React from 'react'
import './UserLists.css'
import './App.css'

function ProjectLists({ sessionUserData, loginStatus, sessionProjData }) {

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
            const projArray = sessionUserData.projects
            const projFilter = projArray.filter((value, index, projArray) => {
                return projArray.findIndex(v => v.id === value.id) === index;
            })
            return projFilter.map((project) => {
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
                    <h1>Active Project List</h1>
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
                if (sessionProjData === []) {
                    return (<h5>There are currently no Active Projects</h5>)
            }
        }

        const execProjects = () => {
            if (loginStatus === true) {
                    return (
                        <div>
                            {projectsView()}
                        </div>
                    )
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