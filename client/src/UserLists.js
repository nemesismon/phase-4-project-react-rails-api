import React, {useState} from 'react'
import EditForm from './EditForm'
import './UserLists.css'
import './App.css'
import { useNavigate, Link } from 'react-router-dom'

function UserLists({sessionUserData, setSessionUserData, loginStatus, sessionProjData, handleGetProjects, setSessionProjData}) {

    console.log(sessionUserData)

    const [createPunchItem, setCreatePunchItem] = useState(false)
    const [itemTask, setItemTask] = useState('')
    const [itemNotes, setItemNotes] = useState('')
    const [itemCompBy, setItemCompBy] = useState()
    const [itemErrors, setItemErrors] = useState()
    const [editErrors, setEditErrors] = useState()
    const [selectProject, setSelectProject] = useState()
    const [selectArea, setSelectArea] = useState()

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
                    // sessionUserData.punch_items.push(respData)
                    setSessionUserData(respData)
                    setCreatePunchItem(false)
                    setSelectProject(null)
                    setSelectArea(null)
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
    
    const handleCompleteItem = (item) => {
        fetch(`/punch_items/${item.id}`, {
            method: 'DELETE',
        })
        for (let x = 0; x < sessionUserData.punch_items.length; x++) {
            if (sessionUserData.punch_items[x].id === item.id) {
                sessionUserData.punch_items.splice(x, 1)
            }
            setSessionUserData({ ...sessionUserData })
        }
    }

    const listPunchItems = () => {
         return sessionUserData.punch_items.map((item) => {
            return (
                <EditForm item={item} handleCompleteItem={handleCompleteItem} sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} setEditErrors={setEditErrors} projectSelector={projectSelector} areaSelector={areaSelector} selectProject={selectProject} selectArea={selectArea} sessionProjData={sessionProjData} handleGetProjects={handleGetProjects} setSessionProjData={setSessionProjData}/>
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
            <option value={''} disabled selected>Select Project</option>
            {sessionProjData.map((project) => {
                return (
                    <option key={project.id} value={project.id}>{project.title}</option>
                )
            })}
        </select>
        )
    }

    // put in data file
    const areas = [
        {value: 'Offsite', label: 'Offsite'},
        {value: 'Site', label: 'Site'},
        {value: 'Building', label: 'Building'},
        {value: 'Electrical', label: 'Electrical'},
        {value: 'Plumbing', label: 'Plumbing'},
        {value: 'HVAC', label: 'HVAC'},
    ]

    const areaSelector = () => {
        return (
            <select name='area-selector' onChange={e => setSelectArea(e.target.value)}>
                <option value={''} disabled selected>Select Area</option>
                {areas.map((area) => {
                    return (
                        <option key={area.id} value={area.value}>{area.value}</option>
                    )
                })}
            </select>
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
            if (createPunchItem === false) {
            return (
                <div>
                    <h1>Punch List</h1>
                    <h4>Welcome, {sessionUserData.point_of_contact}!</h4>
                            <div align='right'>
                                <input type='button' value='Create Punch Item' onClick={() => {setCreatePunchItem(true); setItemErrors(null)}}/> 
                            </div>
                        <div>
                            <table align='center' className=''>
                                <tr>
                                    <th>Task</th>
                                    <th>Project</th>
                                    <th>Area</th>
                                    <th>Notes</th>
                                    <th>Complete by:</th>
                                </tr>
                                    {listPunchItems()}
                            </table>
                                {itemMessages()}
                                {projMessages()}
                        </div>
                </div>
            )} else {
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
                )}
        }}

    return (
        <div>
            {execProfile()}
        </div>
    )
}

export default UserLists