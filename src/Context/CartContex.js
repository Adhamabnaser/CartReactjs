
import axios from 'axios';
import { data } from 'jquery';
import React , { createContext, useEffect, useState } from 'react'

export const Cartext = createContext();


export default function CartContextProvider({children}) 
{

   const [Cartproduct , setCartproduct ]  =  useState(null);
   const [totalCartPrice , settotalCartPrice ]  =  useState(0);
   const [numOfCartItems , setnumOfCartItems ]  =  useState(0);
   const [CartID , setCartID ]  =  useState(null);


async function UpdateCount(id , count) 
{
 try 
    {
      const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{'count': count},{ headers : {token : localStorage.getItem('tkn')} })
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
        setCartproduct(data.data.products);
        console.log(data.numOfCartItems);
      return data 
    }
  catch (error) 
    {
        console.log("error is : " + error);
    }
}

async function DelCartProductData() 
{
 try 
 {
 const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{headers : {token : localStorage.getItem('tkn')} })
 //   console.log(x);
     setnumOfCartItems(0);
     settotalCartPrice(0);
     setCartproduct([]);
 
     
 } catch (error) 
 {
   console.log(error +"<= Here's Error");  
 }
}



   async function DelCartProduct(id) 
   {
    try 
    {
    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers : {token : localStorage.getItem('tkn')} })
    //   console.log(x);
        setnumOfCartItems(data.numOfCartItems);
        settotalCartPrice(data.data.totalCartPrice);
        setCartproduct(data.data.products);

        // console.log(data.numOfCartItems);
        // console.log("delete"); 
        return data; 
    } catch (error) 
    {
      console.log(error +"<= Here's Error");  
    }
   }

    async function AddProductToCart(productId)
    {
        
      try
      {
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart/",{'productId' : productId},
        {headers : {token : localStorage.getItem('tkn')} })
        // console.log(data);
        GetUserCart();
        return data;
      }
      catch(e)
      {
        console.log('error is ' + e);
      }
      
    }
   
    async function GetUserCart() 
    {
       try
       {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart/",
        {headers : {token : localStorage.getItem('tkn')} })
        // console.log(data);
        setCartproduct(data.data.products);
        setnumOfCartItems(data.numOfCartItems); 
        settotalCartPrice(data.data.totalCartPrice);
        setCartID(data.data._id);
        console.log(data.data._id);

        // console.log(data.numOfCartItems);
       }
       catch(e)
       {
        console.log("Erroor" + e);
       }
            
    }

    


    useEffect(function () 
    {
            GetUserCart();
            DelCartProductData();
          
    },[])

  return <>
  <Cartext.Provider value = {{AddProductToCart,
                                GetUserCart,
                                numOfCartItems,
                                totalCartPrice,
                                Cartproduct,
                                DelCartProduct,
                                UpdateCount,
                                DelCartProductData,
                                CartID
                            }}>
        {children}
  </Cartext.Provider>
  </>
}