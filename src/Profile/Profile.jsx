import React, {  useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { Watch } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Profile() 
{
     const[name,setname] =useState(null)


if (name===null) 
{
      <div className='d-flex vh-100 justify-content-center algin-item-center'>
      <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
      />    
  </div> 
}


 useEffect( ()=> 
 {    
      // const x =jwtDecode(localStorage.getItem('tkn'))
      const x =jwtDecode(localStorage.getItem('tkn'))
      setname(x.name);
     console.log(x);
 },[])
  return <>
        
        {/* <div className='bg-light vh-100'>
        <p>{token}</p>
        </div> */}
        <Helmet>
        <title>Profile</title>
        </Helmet>
        <div className="container mt-5 pt-5">
            <div className='mt-5 pt-5'>
                <h1 className='text-center'><span className='text-white main-bgcolor ps-2'>Your Account Name is : </span> <span className='main-color ps-2'> {name}</span></h1>
                 <h3 className='text-center pt-5'>Welocome and Thank You for using Fresh Cart Web Site</h3> 
            </div>
        </div>
        
        </>
}

 