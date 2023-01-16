import React, { useState } from 'react'

function EditForm ({item, handleCompleteItem, sessionUserData, setSessionUserData, setEditErrors}) {

    const [editItem, setEditItem] = useState(false)
    const [updateTask, setUpdateTask] = useState('')
    const [updateArea, setUpdateArea] = useState('')
    const [updateNotes, setUpdateNotes] = useState('')
    const [updateCompleteBy, setUpdateCompleteBy] = useState()

    const handleUpdateItem = (e) => {
        e.preventDefault();

        fetch(`/punch_items/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: updateTask,
                area: updateArea,
                notes: updateNotes,
                complete_by: updateCompleteBy
            })  
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((respData) => {
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
                    setUpdateTask('')
                    setUpdateArea('')
                    setUpdateNotes('')
                    setUpdateCompleteBy()
                    setEditItem(false)        
                })
            }
    })}

    const execForm = () => {
    if (editItem === false) {
        return (
            <tr key={item.id}>
                <td>{item.task}</td>
                <td>{item.area}</td>
                <td>{item.notes}</td>
                <td>{item.complete_by}</td>
                <input type='button' value='Complete' onClick={() => handleCompleteItem(item)}/>
                <input type='button' value='Edit' onClick={() => setEditItem(true)}/>
            </tr>
        )
    } else if (item !== null && editItem === true){
            return ( 
            <tr key={item.id}>
                    <input type='text' name='task' placeholder={item.task} value={updateTask} onChange={e => {setUpdateTask(e.target.value)}} />
                    <input type='text' name='area' placeholder={item.area} value={updateArea} onChange={e => {setUpdateArea(e.target.value)}} />
                    <input type='text' name='notes' placeholder={item.notes} value={updateNotes} onChange={e => {setUpdateNotes(e.target.value)}} />
                    <input type='date' name='complete by' placeholder={item.complete_by} value={updateCompleteBy} onChange={e => {setUpdateCompleteBy(e.target.value)}} />
                    <input type='button' value='Save' onClick={e => handleUpdateItem(e)} />
            </tr>
            )
    }}

    return (
        execForm()
    )
}

export default EditForm