import React, {useState} from 'react'
import EditForm from './EditForm'
import './UserLists.css'

function UserLists({sessionUserData, setSessionUserData, loginStatus}) {

    const [createPunchItem, setCreatePunchItem] = useState(false)
    const [itemProjID, setItemProjID] = useState(null)
    const [itemTask, setItemTask] = useState('')
    const [itemArea, setItemArea] = useState('')
    const [itemNotes, setItemNotes] = useState('')
    const [itemCompBy, setItemCompBy] = useState(null)
    const [itemErrors, setItemErrors] = useState()
    const [editErrors, setEditErrors] = useState()

     
    const handleItemCreate = (e) => {
        e.preventDefault();

        fetch('/punch_items', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                    project_id: itemProjID,
                    task: itemTask,
                    area: itemArea,
                    notes: itemNotes,
                    complete_by: itemCompBy,
                    active: true,
                }),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((respData) => {
                    sessionUserData.punch_items.push(respData)
                    setSessionUserData({ ...sessionUserData })
                })
            } else {
                return r.json().then((errorData) => {
                    setItemErrors(errorData)
                })
            }
        })
        setItemProjID()
        setItemTask('')
        setItemArea('')
        setItemNotes('')
        setItemCompBy()
        setCreatePunchItem(false)
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
                <EditForm item={item} handleCompleteItem={handleCompleteItem} sessionUserData={sessionUserData} setSessionUserData={setSessionUserData} setEditErrors={setEditErrors}/>
            )
         })
    }

    const itemMessages = () => {
        if (sessionUserData.punch_items.length === 0) {
            return (<h4>There are currently no items to complete</h4>)
        }
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
            const showEditErrors = editErrors ? editErrors.error : null
            const showItemErrors = itemErrors ? itemErrors.error : null
            if (createPunchItem === false) {
            return (
                <div>
                    <h1>Punch List</h1>
                    <h4>Welcome, {sessionUserData.point_of_contact}!</h4>
                            <div align='right'>
                                <input type='button' value='Create Punch Item' onClick={() => setCreatePunchItem(true)}/> 
                            </div>
                        <div>
                        <><h5>{showItemErrors}</h5></>
                        <><h5>{showEditErrors}</h5></>
                            <table align='center'>
                                <tr>
                                    <th>Task</th>
                                    <th>Area</th>
                                    <th>Notes</th>
                                    <th>Complete by:</th>
                                </tr>
                                    {listPunchItems()}
                            </table>
                                {itemMessages()}
                        </div>
                </div>
            )} else {
                return (
                    <div>
                        <h1>Add New Punch Item</h1>
                        <div align='right'>
                            <input type='button' value='Back to Punch List' onClick={() => setCreatePunchItem(false)}/> 
                        </div>
                        <h5><b>* All fields required</b></h5>
                        <form onSubmit={handleItemCreate}>
                            <input
                                type='text'
                                name='project_id'
                                placeholder='Project Name (project_id)'
                                value={itemProjID}
                                onChange={(e) => setItemProjID(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type='text'
                                name='task'
                                placeholder='Task'
                                value={itemTask}
                                onChange={(e) => setItemTask(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type='text'
                                name='area'
                                placeholder='Area'
                                value={itemArea} 
                                onChange={(e) => setItemArea(e.target.value)}
                            />
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