import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom';

export default function CategoryDetails() 
{
    const {id} = useParams();
    console.log(id);
function CategoryDetails() 
{
  const{data} =  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    console.log(data);
}

CategoryDetails()
  return <>
  <div className="container">
    <h1>Category Details</h1>
  </div>
  
  
  
  </>
}
