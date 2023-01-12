import React, { useState } from 'react'

function EditForm ({item, handleCompleteItem, sessionUserData, setSessionUserData}) {

    const [editItem, setEditItem] = useState(false)
    const [updateTask, setUpdateTask] = useState('')
    const [updateArea, setUpdateArea] = useState('')
    const [updateNotes, setUpdateNotes] = useState('')
    const [updateCompleteBy, setUpdateCompleteBy] = useState()

    const handleUpdateItem = (e) => {
        e.preventDefault();

        if (updateTask || updateArea || updateNotes === '' ) {
            setEditItem(false)
        }

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
                return r.json()
            }
            throw new Error('Insufficient or inccorect data')})
        .then((data) => {
            if (data.status === 500) {
                setEditItem(false)
            } else {
                item.task = data.task === "" ? item.task : data.task
                item.area = data.area === "" ? item.area : data.area
                item.notes = data.notes === "" ? item.notes : data.notes
                item.complete_by = data.complete_by === "" ? item.complete_by : data.complete_by
                setSessionUserData({ ...sessionUserData })
            }
            setUpdateTask('')
            setUpdateArea('')
            setUpdateNotes('')
            setUpdateCompleteBy()
            setEditItem(false)
        })
        .catch((error) => (error))
    }

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
                    <input type='button' value='Edit' onClick={e => handleUpdateItem(e, item)} />
            </tr>
            )
    }}

    return (
        execForm()
    )
}

export default EditForm