import React, {useState} from 'react'
import './UserLists.css'

function ProjectLists({ loginStatus }) {

    const [projSession, setProjSession] = useState(null)
    const [projSessionToggle, setProjSessionToggle] = useState(false)
    const [createProject, setCreateProject] = useState(false)
    const [projTitle, setProjTitle] = useState(null)
    const [projAddress, setProjAddress] = useState(null)
    const [projOwnerName, setProjOwnerName] = useState(null)
    const [projCompBy, setProjCompBy] = useState(null)

    if (projSessionToggle === false && projSession === null && loginStatus === true) {
        fetch('/projects')
        .then((r) => r.json())
        .then((data) => setProjSession(data))
        setProjSessionToggle(true)
    } else if (projSessionToggle === true && loginStatus === false ) {
        setProjSession(null)
    }

    const projectsList = () => {
        if (projSession === null) {
            return (
                <p>Loading...</p>
            )
        } else if (projSession !== null) {
            const projList = projSession.map((item) => {
                return (
                    <tbody>
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.address}</td>
                        <td>{item.owner_name}</td>
                        {item.users.map((user) => {
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
                    </tbody>
                )
            })
            return projList
        }
    }

    const sessionCheck = () => {
        if ( projSessionToggle === false) {
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

        const createProjectForm = () => {
            return (
                <div>
                    <h1>Add New Project</h1>
                    <div align='right'>
                        <input type="button" value="Projects List" onClick={() => setCreateProject(false)}/> 
                    </div>
                    <form>
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
                        name="owner name"
                        placeholder="Owner Name"
                        value={projOwnerName} 
                        onChange={(e) => setProjOwnerName(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="date"
                        name="complete by"
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
            if (createProject === false) {
                return (
                    <div>
                        {sessionCheck()}
                    </div>
                )
            } else {
                return (
                    <div>
                        {createProjectForm()}
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