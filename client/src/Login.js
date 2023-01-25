import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css';

function Login({setSessionUserData, sessionUserData, loginStatus, setLoginStatus, setSessionProjData, handleGetProjects}) {

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[passwordConfirmation, setPasswordConfirmation] = useState('')
    const[companyName, setCompanyName] = useState('')
    const[address, setAddress] = useState('')
    const[tradeType, setTradeType] = useState('')
    const[poc, setPoc] = useState('')
    const[phone, setPhone] = useState()
    const[email, setEmail] = useState('')
    const[loginCreate, setLoginCreate] = useState(true)
    const[loginErrors, setLoginErrors] = useState()
    const[createErrors, setCreateErrors] = useState()
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
                    setUsername('')
                    setPassword('')
                    navigate('/profile')        
                })
            } else {
                return r.json().then((errorData) => {
                    setLoginErrors(errorData.error)
                    setSessionUserData(null)
                    setLoginStatus(false)
                    setPassword('')        
                })
            }})
            setCreateErrors()
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
                        setUsername('')
                        setPassword('')
                        setPasswordConfirmation('')
                        setCompanyName('')
                        setAddress('')
                        setTradeType('')
                        setPoc('')
                        setPhone()
                        setEmail('')      
                        navigate('/profile')        
                    })
                } else {
                    return r.json().then((errorData) => {
                        setCreateErrors(errorData.errors)
                        setLoginStatus(false)
                    })
                }
        })                   
    }

    const loginDisplay = () => {
        if (sessionUserData === null && loginStatus === false) {
            const showLoginError = loginErrors ? loginErrors : null
            return (
                <div>
                    <><h5 className='make_red'>{showLoginError}</h5></>
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
        const createErrorList = createErrors ? <h5 className='make_red'>{
            createErrors.map((error) => {
                return (<li>{error}</li>)
            })}</h5> : null
        return (
            <div>
                <form onSubmit={handleUserCreate}>
                    <h5><b>*All fields required</b></h5>
                    {createErrorList}
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
                        <button onClick={() => {toggleButton(); setCreateErrors()}}>{loginCreate ? 'Signup' : 'Login'}</button>
                        <br></br>
                        {loginDisplay()}
                    </>
                )
            } else {
                return (
                    <>
                        <h1>Create Account</h1>
                        <button onClick={() => {toggleButton(); setLoginErrors()}}>{loginCreate ? 'Signup' : 'Login'}</button>
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