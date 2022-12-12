import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar({ loginStatus }) {

    return (
        <div>
            <br></br>
            <b>
                <NavLink style={{textDecoration: 'none'}}
                    to="/">
                        Home &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to="/userlist">
                        Punch List &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to="/projectlist">
                        Project List &ensp;
                </NavLink>
                <NavLink style={{textDecoration: 'none'}}
                    to="/login">
                        {loginStatus ? 'Logout' : 'Login'} &ensp;
                </NavLink>
            </b>
        </div>
    )
}

export default NavBar