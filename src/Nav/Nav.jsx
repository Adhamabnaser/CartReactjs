import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authcontext } from './../Context/Authentication';
import { Cartext } from './../Context/CartContex';

export default function Nav() 
{

const {token ,setToken}   = useContext(authcontext);
const logNavigate = useNavigate();
const {numOfCartItems} =  useContext(Cartext);
function logOut() 
    {
        localStorage.removeItem('tkn');
        setToken(null);
        logNavigate('/log');
    }

  return <>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 ">
  <div className="container">
    {token? <>    <Link className="navbar-brand fs-3 fw-medium" to="/Product"><i className="fa-solid fa-cart-shopping main-color"></i> Fresh Cart</Link></>  : <>    <Link className="navbar-brand fs-3 fw-medium" to="/log"><i className="fa-solid fa-cart-shopping main-color"></i> Fresh Cart</Link> </>}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
       {token?  <>
       
       
      
        <li className="nav-item">
          <Link className="nav-link" to="Product">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">All Orders</Link>
        </li>
       
       
       
                 </>  : "" }
      </ul>
      
      <ul className="navbar-nav ms-auto">
        {token?<>
          <li className="nav-item">
                <Link className="nav-link position-relative me-3" to="cart"><i className="fa-brands fa-opencart main-color fs-4 "></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill main-color">
                      {numOfCartItems}
                      <span className="visually-hidden">unread messages</span>
                </span>
                </Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="profile">Profile</Link>
              </li>
              <li className="nav-item">
              <span onClick={logOut} style={{cursor : "pointer"}} className="nav-link ">Log Out</span>
              </li>
        </>:
        <>        
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="reg">Register</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/log">Log In</Link>
              </li>

        </>}
       
      </ul>
    </div>
  </div>
</nav>
  
  </>
}
