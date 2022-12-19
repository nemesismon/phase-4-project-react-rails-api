import React, {useState} from 'react'
import './UserLists.css'

function UserLists({sessionUserData, setSessionUserData, loginStatus}) {

    const [createPunchItem, setCreatePunchItem] = useState(false)
    const [itemUserID, setItemUserID] = useState(null)
    const [itemProjID, setItemProjID] = useState(null)
    const [itemTask, setItemTask] = useState("")
    const [itemArea, setItemArea] = useState("")
    const [itemNotes, setItemNotes] = useState("")
    const [itemCompBy, setItemCompBy] = useState(null)

    const handleItemCreate = (e) => {
        e.preventDefault();
        fetch('/punch_items', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                    user_id: itemUserID,
                    project_id: itemProjID,
                    task: itemTask,
                    area: itemArea,
                    notes: itemNotes,
                    complete_by: itemCompBy,
                    active: true,
                }),
        })
        .then((r) => r.json())
        .then((data) => setSessionUserData(data))
        setItemUserID()
        setItemProjID()
        setItemTask("")
        setItemArea("")
        setItemNotes("")
        setItemCompBy()
        setCreatePunchItem(false)
    }
    
    const handleCompleteItem = (e, id) => {
        e.preventDefault();
        fetch(`/punch_items/${id}`, {
            method: 'DELETE',
        })
        .then((r) => r.json())
        .then((data) => setSessionUserData(data))
    }

    const listPunchItems = () => {
        console.log(sessionUserData)
        const theList = sessionUserData.punch_items.map((item) => {
            if (item.active === true) {
                return (
                    <tr key={item.id}>
                        <td>{item.task}</td>
                        <td>{item.area}</td>
                        <td>{item.notes}</td>
                        <td>{item.complete_by}</td>
                        <input type="button" value="Mark Complete" onClick={e => handleCompleteItem(e, item.id)}/>
                    </tr>
                )
            } else { return null }
        })
        console.log(theList)
        if (theList[0] === undefined || theList[0] === null) {
            return (
                <h4>There are currently no puch items for this user!</h4>
            )
        } else {
            return theList
        }
        }
    
    const sessionCheck = () => {
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
                                <input type="button" value="Create Punch Item" onClick={() => setCreatePunchItem(true)}/> 
                            </div>
                        <div>
                            <table align='center'>
                                <tr>
                                    <th>Task</th>
                                    <th>Area</th>
                                    <th>Notes</th>
                                    <th>Complete by:</th>
                                </tr>
                                    {listPunchItems()}
                            </table>
                        </div>
                </div>
            )} else {
                return (
                    <div>
                        <h1>Add New Punch Item</h1>
                        <div align='right'>
                            <input type="button" value="Back to Punch List" onClick={() => setCreatePunchItem(false)}/> 
                        </div>
                        <form onSubmit={handleItemCreate}>
                        <input
                                type="text"
                                name="user_id"
                                placeholder="Company Name (user_id)"
                                value={itemUserID}
                                onChange={(e) => setItemUserID(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type="text"
                                name="project_id"
                                placeholder="Project Name (project_id)"
                                value={itemProjID}
                                onChange={(e) => setItemProjID(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type="text"
                                name="task"
                                placeholder="Task"
                                value={itemTask}
                                onChange={(e) => setItemTask(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type="text"
                                name="area"
                                placeholder="Area"
                                value={itemArea} 
                                onChange={(e) => setItemArea(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                value={itemNotes} 
                                onChange={(e) => setItemNotes(e.target.value)}
                            />
                            <ul></ul>
                            <input
                                type="date"
                                name="complete by"
                                placeholder="Complete By"
                                value={itemCompBy} 
                                onChange={(e) => setItemCompBy(e.target.value)}
                            />
                            <ul></ul>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
        }}

    return (
        <div>
            {sessionCheck()}
        </div>
    )
}

export default UserLists