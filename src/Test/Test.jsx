import React, { useContext } from 'react'
import { authcontext } from './../Context/Authentication';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) 
{
    const {token}= useContext(authcontext); 
    //if (token == null) leh b2a de 8lt
    
    if (localStorage.getItem('tkn') == null) 
    {
     return <Navigate to = "/log" />
    }
  // prooooblem here
  

  return <>
  
            { children}  
        </>
}
