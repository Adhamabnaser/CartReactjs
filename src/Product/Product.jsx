import React, { useContext, useEffect, useState } from 'react'
import  { authcontext } from '../Context/Authentication'
import axios from 'axios'
import { ThreeDots, Watch } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { Cartext } from '../Context/CartContex';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Product() 
{
    const {AddProductToCart} = useContext(Cartext);
    const {token} = useContext(authcontext);
    const [ loaderbtn , setloaderbtn] =  useState(false)


    async function Addproduct(id)
    {
        setloaderbtn(true)
        const res =  await AddProductToCart(id);

    if (res.status == "success") 
    {
        toast.success(res.message ,{className: "main-color " });
        console.log(res.message +" : "+ 'Product page');
    }
    else
    {
        toast.error("Error Unhandled..." ,{className: "text-danger"});
    }
        setloaderbtn(false);
        
    }
        
        function getAllProducts () 
        {
          return axios.get('https://ecommerce.routemisr.com/api/v1/products') 
        }

       let {data , isFetching , isLoading , isError , refetch} =  useQuery("Allproduct", getAllProducts , 
       {
        // refetchOnMount:false ,
        //  refetchInterval : 2000 ,
          cacheTime:10000
        // enabled:false
        })
      
//////////////////////////==============================================================
// const [AllProduct, setAllProduct] =  useState(null);
// async function getAllProduct()  
// {
//    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products') 
//   setAllProduct(data.data)
//   console.log(data.data); 

// }
// useEffect( function ()  { getAllProduct()}    , [])
////////////////////////////=============================================================                        

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
  {/* <div className="container">
        <button className='btn btn-success w-100' onClick={refetch}>product </button>
    </div> */}
    <Helmet>
    <title>Product</title>
    </Helmet>
         <div className="container">
                <div className="row mb-5 gx-0">
                    <div className='col-sm-9'>
                        <HomeSlider/>
                    </div>
                    <div className='col-sm-3'>
                        <img style={{width:"100%" , height: '150px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt="2immg" />
                        <img style={{width:"100%" , height: '150px '}} src={require('../../src/immg/Screenshot 2023-09-14 143302.png')} alt="2immg" />
                    </div>
                </div> 
                <div className='category row'>
                    <div className='col-sm-12 my-4 mb-5'>
                        <CategorySlider/>
                    </div>
                </div>
                        
     <div className="row">
               {data?.data.data.map(function (products ,index) {return<div key={index} className="col-md-2 ">
                      
                                <Link to={`/ProductDetails/${products.id}`}>
                                        <div className="product  bg-light">
                                                <img className='w-100' src={products.imageCover} alt="product" />
                                                <h6 className='main-color text-center'>{products.category.name}</h6>
                                                <h5 className='text-center'>{products.title.split(' ').slice(0 , 2).join(' ')}</h5>
                                                <div className="d-flex justify-content-between align-item-center">
                                                    <p className='px-2'>{products.price}EGP</p>
                                                    <p className='px-2'><span><i className="fa-solid fa-star-half-stroke main-color"></i></span>{products.ratingsAverage}</p>
                                                </div> 
                
                                            </div>
                                </Link>
                                <button onClick={()=>Addproduct(products.id)} className=' main-bgcolor w-100 rounded-3 border border-white text-white text-center'> 
                                            <div className='d-flex justify-content-center'> + ADD To Cart"  </div>
                                </button>
                      </div>
                      })}

          </div>
        </div> 


        
      {/* {AllProduct? <div className="container">
          <div className="row">
            

             

              {AllProduct.map(function (products ,index) {return<div key={index} className="col-md-2 ">
                      
                        <div className="product  bg-light">
                            <img className='w-100' src={products.imageCover} alt="product" />
                            <h6 className='main-color text-center'>{products.category.name}</h6>
                            <h5 className='text-center'>{products.title.split(' ').slice(0 , 2).join(' ')}</h5>
                            <div className="d-flex justify-content-between align-item-center">
                                  <p className='px-2'>{products.price}EGP</p>
                                  <p className='px-2'><span><i className="fa-solid fa-star-half-stroke main-color"></i></span>{products.ratingsAverage}</p>
                            </div>      
                        </div>
                      </div>
               
              
                
              })}
              

            
          </div>
        </div> :  <div className='d-flex vh-100 justify-content-center algin-item-center'>
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
        </div> } */}

       

        
  
  
        </>
}
