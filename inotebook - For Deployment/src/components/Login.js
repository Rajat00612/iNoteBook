import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const host = 'http://localhost:5000'
function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();


        const response = await fetch(`${host}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })

            });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //  Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Successfully Login", 'success')
            history('/')

        } else {
            props.showAlert("Invaild Crendentials", "danger")
        }

    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className='vh-100' >
            
        
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start">
                        
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis  mb-3"><img class="d-inline-block mx-3 mb-2" src="https://cdn-icons-png.flaticon.com/512/3277/3277345.png" alt="" width="72" height="57"></img>iNotebook Login </h1>
                        <p className="col-lg-10 fs-4 mx-4 px-2">A clean, user-friendly login form for iNotebook that allows new users to quickly login an account and start managing their personal notes.</p>
                    </div> <div className="col-md-10 mx-auto col-lg-5" >
                        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary"onSubmit={handleSubmit}>
                            <div className="form-floating mb-3"> 
                                <input type="email" className="form-control"name='email' id="email"onChange={handleChange}  value={credentials.email} placeholder="Enter your email here" /> 
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password"name='password'className="form-control" onChange={handleChange} id="password" placeholder="Password"value={credentials.password} />
                                <label htmlFor="password">Password</label> </div> 
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button> <hr className="my-4" /> <small className="text-body-secondary">By clicking Login you agree to the terms of use.</small> </form> </div> </div>
                                
        </div>
    )
}

export default Login
