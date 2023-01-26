import React, {useState} from 'react'
import EditForm from './EditForm'
import './UserLists.css'
import './App.css'
import { areas } from './data'
import { Link } from 'react-router-dom'

function UserLists({sessionUserData, setSessionUserData, loginStatus, sessionProjData, handleGetProjects, setSessionProjData, projectErrors, setProjectErrors}) {

    const [createPunchItem, setCreatePunchItem] = useState(false)
    const [createProject, setCreateProject] = useState(false)
    const [itemTask, setItemTask] = useState('')
    const [itemNotes, setItemNotes] = useState('')
    const [itemCompBy, setItemCompBy] = useState('')
    const [itemErrors, setItemErrors] = useState('')
    const [editErrors, setEditErrors] = useState('')
    const [selectProject, setSelectProject] = useState('')
    const [selectArea, setSelectArea] = useState('')
    const [projTitle, setProjTitle] = useState('')
    const [projAddress, setProjAddress] = useState('')
    const [projOwnerName, setProjOwnerName] = useState('')
    const [projCompBy, setProjCompBy] = useState('')

    const handleItemCreate = (e) => {
        e.preventDefault();

        fetch('/punch_items', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                    project_id: selectProject,
                    task: itemTask,
                    area: selectArea,
                    notes: itemNotes,
                    complete_by: itemCompBy,
                    active: true,
                }),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((respData) => {
                    sessionUserData.punch_items.push(respData)
                    sessionUserData.projects.push(respData.project)
                    setSessionUserData({ ...sessionUserData })
                    setCreatePunchItem(false)
                    setSelectProject()
                    setSelectArea()
                    setItemTask('')
                    setItemNotes('')
                    setItemCompBy('')            
                })
            } else {
                return r.json().then((errorData) => {
                    setItemErrors(errorData)
                })
            }
        })
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
                    handleGetProjects()
                    setCreateProject(false)
                    setProjectErrors()
                    setProjTitle('')
                    setProjAddress('')
                    setProjOwnerName('')
                    setProjCompBy('')            
                })
            } else {
                return r.json().then((errorData) => {
                    setProjectErrors(errorData)
                })
            }
    })
    }
    
    const handleCompleteItem = (item) => {
        fetch(`/punch_items/${item.id}`, {
            method: 'DELETE',
        })
        for (let x = 0; x < sessionUserData.punch_items.length; x++) {
            if (sessionUserData.punch_items[x].id === item.id) {
                sessionUserData.punch_items.splice(x, 1)
                const deleteIndexFind = sessionUserData.projects.findIndex(proj => proj.id === item.project_id)
                sessionUserData.projects.splice(deleteIndexFind, 1)
            }
            setSessionUserData({ ...sessionUserData })
        }
    }

    const listPunchItems = () => {
         return sessionUserData.punch_items.map((item) => {
            return (
                <EditForm key={item.id} item={item} handleCompleteItem={handleCompleteItem} sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} setEditErrors={setEditErrors} projectSelector={projectSelector} areaSelector={areaSelector} selectProject={selectProject} selectArea={selectArea} sessionProjData={sessionProjData} handleGetProjects={handleGetProjects} setSessionProjData={setSessionProjData}/>
            )
         })
    }

    const itemMessages = () => {
        if (sessionUserData.punch_items.length === 0) {
            return (<h5 style={{color: 'green'}}>There are currently no items to complete!</h5>)
        }     
    }

    const projMessages = () => {
        if (sessionProjData === undefined) {
            return (<h5>Please add a <Link to={'/projects'}>Project</Link> to begin creating Punch Items</h5>)
        }
    }

    const projectSelector = () => {
        return (
            <select name='project_selector' onChange={e => setSelectProject(e.target.value)}>
                <option value={''} defaultValue={'Select Project'} >Select Project</option>
                {sessionProjData.map((project) => {
                    return (
                        <option key={project.id} value={project.id}>{project.title}</option>
                    )
                })}
            </select>
        )
    }

    const areaSelector = () => {
        return (
            <select name='area-selector' onChange={e => setSelectArea(e.target.value)}>
                <option value={''} defaultValue={'Select Area'} >Select Area</option>
                {areas.map((area) => {
                    return (
                        <option key={area.id} value={area.value}>{area.value}</option>
                    )
                })}
            </select>
        )
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
                    <input type='button' value='Back to Punch List' onClick={() => {setCreatePunchItem(false); setCreateProject(false); setEditErrors(null)}}/> 
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
    
    const execProfile = () => {
        if (loginStatus === false) {
            return (
                <h4>Unauthorized - please login</h4>
            )
        } else if (sessionUserData === null && loginStatus === true) {
            return (
                <h4>Loading...</h4>
            )
        } else if (sessionUserData !== null && loginStatus === true) {
            if (createPunchItem === false && createProject === false) {
            return (
                <div>
                    <h1>Punch Item List</h1>
                            <div align='right'>
                                <input type='button' value='Create Project' onClick={() => setCreateProject(true)} />
                                <ul></ul>
                                <input type='button' value='Create Punch Item' onClick={() => {setCreatePunchItem(true); setItemErrors(null)}}/> 
                            </div>
                        <div>
                            <table align='center' className=''>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Project</th>
                                        <th>Area</th>
                                        <th>Notes</th>
                                        <th>Complete by:</th>
                                    </tr>
                                </thead>
                                    {listPunchItems()}
                            </table>
                                {itemMessages()}
                                {projMessages()}
                        </div>
                </div>
            )} else if (createPunchItem === true && createProject === false) {
                const showEditErrors = editErrors ? <h5 className='make_red'>{
                        editErrors.errors.map((error) => {
                            return (<li key={error}>{error}</li>)
                    })}</h5> : null
                const showItemErrors = itemErrors ? 
                    <h5 className='make_red'>{
                        itemErrors.errors.map((error) => {
                            return (<li key={error}>{error}</li>)
                    })}</h5> : null 
                return (
                    <div>
                        <h1>Add New Punch Item</h1>
                            <div align='right'>
                                <input type='button' value='Back to Punch List' onClick={() => {setCreatePunchItem(false); setEditErrors(null)}}/> 
                            </div>
                        <h5><b>*All fields required</b></h5>
                            {showItemErrors}
                            {showEditErrors}
                        <form onSubmit={handleItemCreate}>
                            {projectSelector()}
                            <ul></ul>
                            <input
                                type='text'
                                name='task'
                                placeholder='Task'
                                value={itemTask}
                                onChange={(e) => setItemTask(e.target.value)}
                            />
                            <ul></ul>
                                {areaSelector()}
                            <ul></ul>
                            <input
                                type='text'
                                name='notes'
                                placeholder='Notes'
                                value={itemNotes} 
                                onChange={(e) => setItemNotes(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type='date'
                                name='complete by'
                                placeholder='Complete By'
                                value={itemCompBy} 
                                onChange={(e) => setItemCompBy(e.target.value)}
                            />
                            <ul></ul>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                )} else if (createPunchItem === false && createProject === true){
                    return (
                        <div>
                            {createProjectForm()}
                        </div>
                    )
                }
        }}

    return (
        <div>
            {execProfile()}
        </div>
    )
}

export default UserLists