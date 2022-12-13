import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Login({setSessionUserData, sessionUserData, loginStatus, setLoginStatus, setLogoutStatus}) {

    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[passwordConfirmation, setPasswordConfirmation] = useState("")
    const[companyName, setCompanyName] = useState("")
    const[address, setAddress] = useState("")
    const[tradeType, setTradeType] = useState("")
    const[poc, setPoc] = useState("")
    const[phone, setPhone] = useState(0)
    const[email, setEmail] = useState("")
    const[loginCreate, setLoginCreate] = useState(true) 

    const handleUserLogin = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        .then((r) => r.json())
        .then((resp) => setSessionUserData(resp))
        setLoginCreate(true)
        setLoginStatus(true)
        setUsername("")
        setPassword("")
        return (
            <Navigate to='/userlists' replace />
        )
    }

    const handleUserCreate = (e) => {
        e.preventDefault();
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation,
                company_name: companyName,
                address: address,
                trade_type: tradeType,
                point_of_contact: poc,
                phone: phone,
                email: email
            }),
        }) .then((res) => res.json())
           .then((data) => setSessionUserData(data))
            setLoginCreate(true)
            setLoginStatus(true)
            return (
                <Navigate to='/userlists' replace />
            )
    }

    const loginDisplay = () => {
        if (sessionUserData === null) {
            return (
                <div>
                    <form onSubmit={handleUserLogin}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <ul></ul>
                        <input
                            type="text"
                            name="password"
                            placeholder="Password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ul></ul>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )} 
        else {
            return (
                <Navigate to='/userlist' replace />
            )
        }
    }

    const createDisplay = () => {
        return (
            <div>
                <form onSubmit={handleUserCreate}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Confirmation"
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="trade_type"
                        placeholder="Trade Type"
                        value={tradeType} 
                        onChange={(e) => setTradeType(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="point_of_contact"
                        placeholder="Point of Contact"
                        value={poc} 
                        onChange={(e) => setPoc(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ul></ul>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    const logout = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
        setLoginStatus(false)
        setSessionUserData(null)
    }

    const toggleButton = () => setLoginCreate(!loginCreate)

    const displayChanger = () => {

        if (loginStatus === false) {
            if (loginCreate === true) {
                return (
                    <>
                        <h1>Login</h1>
                        <button onClick={() => toggleButton()}>{loginCreate ? "Signup" : "Login"}{() => displayChanger()}</button>
                        <br></br>
                        {loginDisplay()}
                    </>
                )
            } else {
                return (
                    <>
                        <h1>Create Account</h1>
                        {/* Redundent?? */}
                        <button onClick={() => toggleButton()}>{loginCreate ? "Signup" : "Login"}{() => displayChanger()}</button>
                        <br></br>
                        {createDisplay()}
                    </>
                )
            }
        } else {
            return (
                <>
                    <h1>Logout</h1>
                    <h4>Click to logout</h4>
                    <button onClick={() => logout(setLoginStatus(false))}>Logout</button>
                </>
            )
        }
    }

    return (
        <div>
            {displayChanger()}
        </div>
    )
}

export default Login