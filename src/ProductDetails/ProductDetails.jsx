import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Watch, ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { Cartext } from './../Context/CartContex';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() 
{
const {AddProductToCart} = useContext(Cartext);
const {id} = useParams();
// console.log(id);
 const [ loaderbtn , setloaderbtn] =  useState(false)

  async function Addproduct(id)
  {
    setloaderbtn(true);
   const res =  await AddProductToCart(id);
  //  console.log(res);
  if (res.status == "success") 
  {
    toast.success(res.message ,{className: "main-color "})
  }
  else
    {
        toast.error("Error Unhandled..." ,{className: "text-danger"})
    }
    setloaderbtn(false);
  }



  function getDetails() 
  {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)  
  }
    const {data , isLoading} = useQuery("productdetails", getDetails,{cacheTime:5000})
    // console.log(data?.data);



    if (isLoading) 
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




  return <>
  <Helmet>
  <title>ProductDetails</title>
  </Helmet>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-3">
        <figure>
        <img className='w-100' src = {data.data.data.imageCover} alt={data.data.data.title}/>
        </figure>
      </div>
      <div className="col-md-9 text-center">
          <h3>{data.data.data.title}</h3>
          <p className='text-secondary'>{data.data.data.description}</p>
          <p>{data?.data.data.category.name}</p>
          <p>{data?.data.data.id}</p>
          <p>Price : {data.data.data.price}EGP</p>
          <p>id : {data.data.data.id}EGP</p>


          
          <button onClick={()=> Addproduct (data?.data.data.id)}  className=' main-bgcolor w-100 rounded-3 border border-white text-white'>
            
          <div className='d-flex justify-content-center'>
          {loaderbtn == false?" + ADD To Cart"  :  <ThreeDots    height="23" 
                                                                  width="20" 
                                                                  radius="9"
                                                                  color="#fff" 
                                                                  ariaLabel="three-dots-loading"
                                                                  wrapperStyle={{}}
                                                                  wrapperClassName=""
                                                                  visible={true}  />  }
          </div>


             
             
             
             
          </button>
      </div>
      {/* <div className="footer">
        <h2></h2>
        <p></p>
        <div className='d-flex justify-content-between'>
          <input className='w-75 ' type="text" />
          <button className='btn btn-success'>Share App link</button>
        </div>
      </div> */}
    </div>
  </div>
  </>
}
