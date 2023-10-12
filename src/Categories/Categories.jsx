import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Watch } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Cartext } from '../Context/CartContex';
import toast from 'react-hot-toast';

export default function Categories() 
{
  const {AddProductToCart} = useContext(Cartext);
  const [ loaderbtn , setloaderbtn] =  useState(false)
  const[data , setdata] = useState(null);


  
   async function Category() {
     const{data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data);
    setdata(data);
  }
  useEffect(function () 
  {
    Category()
  },[])
  if (data===null) 
  {
     return <>
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
     
     
     </>   
  }

  return<>
      <Helmet>
      <title>Categories</title>
      </Helmet>
      <div className="container">
        <div className='row'>
            {data?.data.map(function (cat , idx) 
            {
            return <div key={idx} className='col-md-2 '>
                      <Link to={`/categoryDetails/${cat._id}`}>
                                  <div className="category  bg-light">
                                      <img className='w-100' src={cat.image} alt="category" />
                                      <h6 className='main-color text-center'>{cat.name}</h6>
                                     
                                   </div>                   
                      </Link>
                      
              
                   </div>  
            })}
            
        
        </div>
      </div>

  </>
}
