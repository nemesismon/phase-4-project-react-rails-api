import React, { useState } from 'react'

function EditForm ({item, handleCompleteItem, sessionUserData, setSessionUserData, setEditErrors, projectSelector, areaSelector, selectProject, selectArea, sessionProjData}) {

    const [editItem, setEditItem] = useState(false)
    const [updateTask, setUpdateTask] = useState('')
    const [updateNotes, setUpdateNotes] = useState('')
    const [updateCompleteBy, setUpdateCompleteBy] = useState()
    const [titleFound, setTitleFound] = useState(false)

    console.log(selectProject)

    const handleUpdateItem = (e) => {
        e.preventDefault();

        fetch(`/punch_items/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_id: selectProject,
                task: updateTask,
                area: selectArea,
                notes: updateNotes,
                complete_by: updateCompleteBy
            })  
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((respData) => {
                    console.log(respData)
                    item.project_id = respData.project_id ? respData.project_id : item.project_id
                    item.task = respData.task ? respData.task : item.task
                    item.area = respData.area ? respData.area : item.area
                    item.notes = respData.notes ? respData.notes : item.notes
                    item.complete_by = respData.complete_by ? respData.complete_by : item.complete_by
                    setSessionUserData({ ...sessionUserData })
                    setEditItem(false)
                })
            } else {
                return r.json().then((errorData) => {
                    setEditErrors(errorData)
                })
            }
        })
        setUpdateTask('')
        setUpdateNotes('')
        setUpdateCompleteBy()
        setEditItem(false)        
    }

    const punchItemToProjectTitle = () => {
        //find project title using punch_item.project_id
        // debugger
        if (sessionProjData !== null) {
            return (sessionProjData.find(proj => proj.id === item.project_id)).title
        }
    }

    console.log(sessionUserData)
    console.log(sessionProjData)

    const execForm = () => {
    if (editItem === false && titleFound === false) {
        // debugger
        return (
            <tr key={item.id}>
                <td>{item.task}</td>
                <td>{punchItemToProjectTitle()}</td>
                <td>{item.area}</td>
                <td>{item.notes}</td>
                <td>{item.complete_by}</td>
                <td><input type='button' value='Complete' onClick={() => handleCompleteItem(item)}/></td>
                <td><input type='button' value='Edit' onClick={() => setEditItem(true)}/></td>
            </tr>
        )
    } else if (item !== null && editItem === true){
            return ( 
            <tr key={item.id}>
                    <td><input type='text' name='task' placeholder={item.task} value={updateTask} onChange={e => {setUpdateTask(e.target.value)}} /></td>
                    <td>{projectSelector()}</td>
                    <td>{areaSelector()}</td>
                    <td><input type='text' name='notes' placeholder={item.notes} value={updateNotes} onChange={e => {setUpdateNotes(e.target.value)}} /></td>
                    <td><input type='date' name='complete by' placeholder={item.complete_by} value={updateCompleteBy} onChange={e => {setUpdateCompleteBy(e.target.value)}} /></td>
                    <td><input type='button' value='Save' onClick={e => handleUpdateItem(e)} /></td>
            </tr>
            )
    }}

    return (
        execForm()
    )
}

export default EditForm