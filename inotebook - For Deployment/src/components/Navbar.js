


import{Link, useLocation, useNavigate}from  "react-router-dom"

 

const Navbar = () => {
     let location = useLocation();   
let history = useNavigate();
 const handleLogout=()=>{
localStorage.removeItem('token');
history('/login')
 }
    return (
        <>
        
            <nav className="navbar navbar-expand-lg  navbar-dark bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">   <img src="https://cdn-icons-png.flaticon.com/512/3277/3277345.png" className='mx-1' alt="" width="30" height="24"/>iNotebook </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page"to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} to="/contact">Contact us</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
          
                       
                            <Link className="btn btn-success mx-1" to="/login"  role="button">Login</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">Signup</Link>
                             </form>:<button onClick={handleLogout} className="btn btn-success">Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
