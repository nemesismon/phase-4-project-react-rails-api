import React , { useState } from 'react'

function EditForm ({item, handleCompleteItem, sessionUserData, setSessionUserData}) {

    const [editItem, setEditItem] = useState(false)
    const [updateTask, setUpdateTask] = useState(null)
    const [updateArea, setUpdateArea] = useState(null)
    const [updateNotes, setUpdateNotes] = useState(null)
    const [updateCompleteBy, setUpdateCompleteBy] = useState(null)


    const handleUpdateItem = (e, item) => {
        e.preventDefault()

        console.log(sessionUserData)

        updateTask === null ? setUpdateTask(sessionUserData) : setUpdateTask(updateTask)
        updateArea === null ? setUpdateArea(sessionUserData) : setUpdateArea(updateArea)
        updateNotes === null ? setUpdateNotes(sessionUserData) : setUpdateNotes(updateNotes)
        updateCompleteBy === null ? setUpdateCompleteBy(sessionUserData) : setUpdateCompleteBy(updateCompleteBy)

        fetch(`/punch_items/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: updateTask,
                area: updateArea,
                notes: updateNotes,
                complete_by: updateCompleteBy,
            })  
        })
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            if (data.status === 500) {
                // console.log('Error, error!')
                return (<p>Error code: {data.status}</p>)
            } else {
            const tempItems = sessionUserData.punch_items
            const findExistingItem = tempItems.find(tempItem => (tempItem.id === data.id)) 
                findExistingItem.task = data.task
                findExistingItem.area = data.area
                findExistingItem.notes = data.notes
                findExistingItem.complete_by = data.complete_by
                console.log(findExistingItem)
            setSessionUserData({ ...sessionUserData })
            }
        })
        setEditItem(false)
        setUpdateTask(null)
        setUpdateArea(null)
        setUpdateNotes(null)
        setUpdateCompleteBy(null)
    }

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
                <input type='text' name='task' placeholder={item.task} value={updateTask} onChange={e => setUpdateTask(e.target.value)} />
                <input type='text' name='area' placeholder={item.area} value={updateArea} onChange={e => setUpdateArea(e.target.value)} />
                <input type='text' name='notes' placeholder={item.notes} value={updateNotes} onChange={e => setUpdateNotes(e.target.value)} />
                <input type='date' name='complete by' placeholder={item.complete_by} value={updateCompleteBy} onChange={e => setUpdateCompleteBy(e.target.value)} />
                <input type='button' value='Complete' onClick={e => handleCompleteItem(e, item)}/>
                <input type='button' value='Save' onClick={e => handleUpdateItem(e, item)} />
            </tr>
            )
    }
}

export default EditForm