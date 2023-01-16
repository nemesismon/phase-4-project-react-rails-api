import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setSessionUserData, sessionUserData, loginStatus, setLoginStatus, setSessionProjData, handleGetProjects}) {

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[passwordConfirmation, setPasswordConfirmation] = useState('')
    const[companyName, setCompanyName] = useState('')
    const[address, setAddress] = useState('')
    const[tradeType, setTradeType] = useState('')
    const[poc, setPoc] = useState('')
    const[phone, setPhone] = useState(0)
    const[email, setEmail] = useState('')
    const[loginCreate, setLoginCreate] = useState(true)
    const[loginErrors, setLoginErrors] = useState()
    const navigate = useNavigate()

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
        .then((r) => 
            {if (r.ok) {
                return r.json().then((respData) => {
                    setSessionUserData(respData)
                    setSessionProjData(handleGetProjects())
                    setLoginStatus(true)
                    navigate('/profile')        
                })
            } else {
                return r.json().then((errorData) => {
                    setLoginErrors(errorData)
                    setSessionUserData(null)
                    setLoginStatus(false)
                })
            }})
            setUsername('')
            setPassword('')        
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
        })  .then((r) => {
                if (r.ok) {
                    return r.json().then((respData) => {
                        setSessionProjData(handleGetProjects())
                        setSessionUserData(respData)
                        setLoginStatus(true)
                        navigate('/profile')        
                    })
                } else {
                    return r.json().then((errorData) => {
                        setLoginErrors(errorData)
                        setLoginStatus(false)
                    })
                }
                
    })                        
            setUsername('')
            setPassword('')
            setPasswordConfirmation('')
            setCompanyName('')
            setAddress('')
            setTradeType('')
            setPoc('')
            setPhone(0)
            setEmail('')
}

    const loginDisplay = () => {
        if (sessionUserData === null && loginStatus === false) {
            const loginError = loginErrors ? loginErrors.error : null
            return (
                <div>
                    <><h5>{loginError}</h5></>
                    <form onSubmit={handleUserLogin}>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <ul></ul>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ul></ul>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
        )}
    }

    const createDisplay = () => {
        const createError = loginErrors ? 'Insufficient or incorrect data.  Please check entries and try again.' : null
        return (
            <div>
                <><h5>{createError}</h5></>
                <form onSubmit={handleUserCreate}>
                    <h5><b>* All fields required</b></h5>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='password'
                        name='password_confirmation'
                        placeholder='Password Confirmation'
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='company_name'
                        placeholder='Company Name'
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='address'
                        placeholder='Address'
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='trade_type'
                        placeholder='Trade Type'
                        value={tradeType} 
                        onChange={(e) => setTradeType(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='point_of_contact'
                        placeholder='Point of Contact'
                        value={poc} 
                        onChange={(e) => setPoc(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='number'
                        name='phone'
                        placeholder='Phone Number'
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <ul></ul>
                    <input
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ul></ul>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }

    const logout = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
            setSessionUserData(null)
            setSessionProjData(null)
            setLoginStatus(false)
    }

    const toggleButton = () => setLoginCreate(!loginCreate)

    const execLogin = () => {
        if (loginStatus === false) {
            if (loginCreate === true) {
                return (
                    <>
                        <h1>Login</h1>
                        <button onClick={() => toggleButton()}>{loginCreate ? 'Signup' : 'Login'}</button>
                        <br></br>
                        {loginDisplay()}
                    </>
                )
            } else {
                return (
                    <>
                        <h1>Create Account</h1>
                        <button onClick={() => toggleButton()}>{loginCreate ? 'Signup' : 'Login'}</button>
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
                    <button onClick={() => logout()}>Logout</button>
                </>
            )
        }
    }

    return (
        <div>
            {execLogin()}
        </div>
    )
}

export default Login