import React, { useState } from 'react'

function EditForm ({item, handleCompleteItem, sessionUserData, setSessionUserData, setEditErrors, sessionProjData}) {

    const [editItem, setEditItem] = useState(false)
    const [updateTask, setUpdateTask] = useState('')
    const [updateProject, setUpdateProject] = useState('')
    const [updateArea, setUpdateArea] = useState('')
    const [updateNotes, setUpdateNotes] = useState('')
    const [updateCompleteBy, setUpdateCompleteBy] = useState()
    const [titleFound, setTitleFound] = useState(false)

    const handleUpdateItem = (e) => {
        e.preventDefault();

        console.log(item)
        fetch(`/punch_items/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_id: updateProject,
                task: updateTask,
                area: updateArea,
                notes: updateNotes,
                complete_by: updateCompleteBy
            })  
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((respData) => {
                    setSessionUserData(respData)
                    setUpdateTask('')
                    setUpdateNotes('')
                    setUpdateCompleteBy()            
                    setEditItem(false)
                })
            } else {
                return r.json().then((errorData) => {
                    setEditErrors(errorData)
                })
            }
        })
    }

    const punchItemToProjectTitle = () => {
        if (sessionProjData !== undefined) {
            return (sessionProjData.find(proj => proj.id === item.project_id)).title
        } else {
            console.log(sessionProjData)
            return
        }
    }

    const updateProjSelector = () => {
        return (
        <select name='update_project_selector' onChange={e => setUpdateProject(e.target.value)}>
            <option value={''} label={punchItemToProjectTitle()} disabled selected>Select Project</option>
            {sessionProjData.map((project) => {
                return (
                    <option key={project.id} value={project.id}>{project.title}</option>
                )
            })}
        </select>
        )
    }

    const areas = [
        {value: 'Offsite', label: 'Offsite'},
        {value: 'Site', label: 'Site'},
        {value: 'Building', label: 'Building'},
        {value: 'Electrical', label: 'Electrical'},
        {value: 'Plumbing', label: 'Plumbing'},
        {value: 'HVAC', label: 'HVAC'},
    ]

    const updateAreaSelector = () => {
        return (
            <select name='update_area-selector' onChange={e => setUpdateArea(e.target.value)}>
                <option value={''} label={item.area} disabled selected>Select Area</option>
                {areas.map((area) => {
                    return (
                        <option key={area.id} value={area.value}>{area.value}</option>
                    )
                })}
            </select>
        )
    }

    const execForm = () => {
    if (editItem === false && titleFound === false) {
        return (
            <tr key={item.id}>
                <td>{item.task}</td>
                <td>{punchItemToProjectTitle()}</td>
                <td>{item.area}</td>
                <td>{item.notes}</td>
                <td>{item.complete_by}</td>
                <td><input type='button' value='Edit' onClick={() => setEditItem(true)}/> &ensp;
                <input type='button' value='Complete' onClick={() => handleCompleteItem(item)}/></td>
            </tr>
        )
    } else if (item !== null && editItem === true){
            return ( 
            <tr key={item.id}>
                    <td><input type='text' name='task' placeholder={item.task} value={updateTask} onChange={e => {setUpdateTask(e.target.value)}} /></td>
                    <td>{updateProjSelector()}</td>
                    <td>{updateAreaSelector()}</td>
                    <td><input type='text' name='notes' placeholder={item.notes} value={updateNotes} onChange={e => {setUpdateNotes(e.target.value)}} /></td>
                    <td><input type='date' name='complete_by' defaultValue={item.complete_by} value={updateCompleteBy} onChange={e => {setUpdateCompleteBy(e.target.value)}} /></td>
                    <td><input type='button' value='Save' onClick={e => handleUpdateItem(e)} /></td>
            </tr>
            )
    }}

    return (
        execForm()
    )
}

export default EditForm