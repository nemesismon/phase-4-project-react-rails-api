import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar({ loginStatus, sessionUserData }) {

    return (
        <div>
            <br></br>
            <b>
                <NavLink style={{textDecoration: 'none'}}
                    to='/'>
                        Home &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to='/punch_items'>
                        Punch Items &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to='/active_project_list'>
                        Active Project List &ensp; &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to='/login'>
                        {loginStatus ? `Logout, ${sessionUserData.point_of_contact}?` : 'Login'} &ensp;
                </NavLink>
            </b>
        </div>
    )
}

export default NavBar