
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function Signup(props) {
  const host = 'http://localhost:5000'
   let history = useNavigate()
  const [credentials, setCredentials] = useState({sname:"", email: "", password: "" ,cpassword:"" })
    const handleSubmit = async (e) => {
        e.preventDefault();


       const  {name,email,password} = credentials
        const response = await fetch(`${host}/api/auth/Createuser`,
          {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({ name , email,password })

            });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //  Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Account Created Successfully",'success')
            history('/')
        } else {
            props.showAlert("Invaild Details",'danger')
            history('/signup')
            
        }

    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div className='container mt-3 vh-100'>
         
      <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start mx-0">
                         <h1 className="display-4 fw-bold lh-1 text-body-emphasis  mb-3"><img class="d-inline-block mx-3 mb-2" src="https://cdn-icons-png.flaticon.com/512/3277/3277345.png" alt="" width="72" height="57"></img>iNotebook Sign up </h1>
                        <p className="col-lg-10 fs-4 mx-4 px-2">A clean, user-friendly sign-up form for iNotebook that allows new users to quickly create an account and start managing their personal notes.</p>
                    </div> <div className="col-md-10 mx-auto col-lg-5" >
                        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary"onSubmit={handleSubmit}>
                            <div className="form-floating mb-3"> 
                                <input type="text" className="form-control"name='name' id="text"onChange={handleChange}   placeholder="Enter your Name here" /> 
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3"> 
                                <input type="email" className="form-control"name='email' id="email"onChange={handleChange}   placeholder="Enter your email here" /> 
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password"name='password'className="form-control" onChange={handleChange} id="password"minLength={5} required  placeholder="Password" />
                                <label htmlFor="password">Password</label> </div> 
                            <div className="form-floating mb-3">
                                <input type="password"name='cpassword'className="form-control" onChange={handleChange} id="cpassword" placeholder="Password"minLength={5} required />
                                <label htmlFor="cpassword"> Confirm Password</label> </div> 

                                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button> <hr className="my-4" /> <small className="text-body-secondary">By clicking Sign up you agree to the terms of use.</small> </form> </div> </div>
    </div>
  )
}

export default Signup
