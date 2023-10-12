import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { RevolvingDot } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
export default function AllOrders() 
{

 const [UserOrders,setUserOrders]  = useState(null);
useEffect(()=>{

    const res =    jwtDecode(localStorage.getItem('tkn'));
    console.log(res.id);
    
    getUserOrders(res.id);    
},[])

async function getUserOrders(id) 
{
  try 
  {
    const{data}= await axios.get(`https:ecommerce.routemisr.com/api/v1/orders/user/${id}`)  
    console.log(data);
    setUserOrders(data);
  } 
  catch (error) 
  {
   console.log(error + "<= Error's"); 
  }
}

if (UserOrders === null ) 
{
    return  <div className='d-flex vh-100 justify-content-center algin-item-center'>
        <RevolvingDot
                radius="45"
                strokeWidth="5"
                color="green"
                secondaryColor='green'
                ariaLabel="revolving-dot-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
    </div>  
}


  return <>
        <Helmet>
        <title>AllOrders</title>
        </Helmet>
  <div className='container' >
    <div className="row">
        {UserOrders.map(function (order , idx) 
        {
            return  <div key={idx} className='col-md-6'>
                        <div className='order rounded-4 bg-light border pt-2 mb-3'>

                            {order.cartItems?.map(( Item , index)=>{return <div className='d-flex gap-5  main-color mt-3  px-3' key={index}>
                                <h5>Count : {Item.count}</h5>
                                <h5>Price : {Item.price}</h5>
                                <h5>Brand : {Item.product.brand.name}</h5>
                               <div>
                               <img className='w-25' src={Item.product.imageCover}/>
                               </div>
                            </div>
                            
                            
                            })}


                            <p className='ps-3 main-color '>Order sent to user with phone : {order.user.phone}</p>
                            <p className='ps-3 main-bgcolor text-white' >Payment Method : {order.paymentMethodType}</p>
                            <p className='ps-3 main-color'>Time of Order : {order.createdAt} </p>
                            <p className='ps-3 main-bgcolor text-white'>total Order price : {order.totalOrderPrice}</p>
                        </div>
                    </div>
        })}
        
    </div>
  </div>
  
  </>
}
