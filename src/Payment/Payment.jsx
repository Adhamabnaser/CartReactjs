import axios from 'axios';
import React, { useContext } from 'react'
import { Cartext } from '../Context/CartContex';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { param } from 'jquery';
import { Helmet } from 'react-helmet';

export default function Payment() 
{

    const {CartID , GetUserCart ,DelCartProductData} =  useContext(Cartext);
   async function ConfirmCashPayment () 
    {
      const details = document.querySelector('#details').value;
      const phone  = document.querySelector('#phone').value;
      const city  = document.querySelector('#city').value;
        const shoppingAddress =
        {
           "details" :   details,
           "phone"   :   phone,
           'city'    :   city
        }
        console.log(CartID);
        try 
        {
           const {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartID}`, shoppingAddress ,{headers:{token:localStorage.getItem("tkn")}});
           console.log(data);
           if (data.status==="success") 
            { 
                toast.success("Successfully Confirmed")
                DelCartProductData();
               
            }
           else
           
        {  
            toast.error("Error Confirmed")
        }
           

        } 
        catch (e) 
        {
         console.log(e + "here's Error");   
        }
    }

    async function ConfirmOnlinePayment () 
    {
      const details = document.querySelector('#details').value;
      const phone  = document.querySelector('#phone').value;
      const city  = document.querySelector('#city').value;
        const shoppingAddress =
        {
           "details" :   details,
           "phone"   :   phone,
           'city'    :   city
        }
        console.log(CartID);
        try 
        {
           const {data} =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}`, shoppingAddress,
         {headers:{token:localStorage.getItem("tkn")},
          params:{url:'http://localhost:3000'}    });
           console.log(data);


           if (data.status==="success") 
            { 
                toast.success("Successfully Confirmed")
                DelCartProductData();
               
            }
           else
           
        {  
            toast.error("Error Confirmed")
        }
           
            window.open(data.session.url , '_blank')
        } 
        catch (e) 
        {
         console.log(e + "here's Error");   
        }
    }
useEffect(function () {
    GetUserCart();
},[])

  return<>
  <Helmet>
  <title>Payment</title>
  </Helmet>
   <div className='container'>
    <h1>Shopping Address :</h1>
    <form>
              <label className='ps-2 fs-4 d-block pt-5 main-color'>Details :</label>
              <input className= ' ps-2 border border-light rounded-1 w-100' type="text" placeholder='Details'  id='details'  />
  
              <label className='ps-2 fs-4 d-block main-color'>Phone :</label>
              <input className= ' ps-2 border border-light rounded-1 w-100' type="tel"  placeholder='Phone'    id='phone' />

              <label className='ps-2 fs-4 d-block main-color'>City :</label>
              <input className= ' ps-2 border border-light rounded-1 w-100' type="text" placeholder='City'     id='city' />
              <div className='d-flex justify-content-between'>
              <button onClick={ConfirmCashPayment} type='button' className='btn btn-primary mt-5'> Confirm cash Payment</button>
              <button onClick={ConfirmOnlinePayment}  type='button' className='btn btn-primary mt-5'> Confirm Online Payment</button>
              </div>

            
    </form>
    
   </div>
  
  
  </>
}
