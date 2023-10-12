import { createContext, useEffect, useState } from "react";


export const authcontext =  createContext();

export default function Authprovider({children}) 
{
        const [token , setToken] = useState(null);
        useEffect(function () 
        {
            if (localStorage.getItem("tkn") != null) 
            {
               let x =  localStorage.getItem("tkn")
               setToken(x)
             
            }
        }, [])

  return <>

        <authcontext.Provider value={{token , setToken}}>
            {children}
        </authcontext.Provider>
        
  
  
        </>
}
