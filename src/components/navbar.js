import React from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem('auth-token');
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location === '/' ? "active":""}`} aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location === '/' ? "active":""}`}>
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('auth-token')?<form className="d-flex" role="search">
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </form>:<button className='btn btn-primary mx-2' onClick={handlelogout}>Logout</button>
            }
            
          </div>
        </div>
      </nav>
    </>
  );
}
