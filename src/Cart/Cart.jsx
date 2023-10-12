import React, { useContext } from 'react'
import { Cartext } from './../Context/CartContex';
import { Puff } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Cart from './Cart';

export default function Cart() 
{
const {numOfCartItems,totalCartPrice,Cartproduct,DelCartProduct,UpdateCount,DelCartProductData} = useContext(Cartext);
// console.log(Cartproduct);



async function deleteDataProduct() {
  await DelCartProductData() 
}
async function increCount(id,count) 
{
   const res = await UpdateCount(id,count);

   if (res.status === "success") 
   {
     toast.success("product added")  
   }
   else
   {
     toast.error("product dosen't added")
   }
}
async function decreCount(id,count) 
{
  const res = await UpdateCount(id,count);
  if (res.status === "success") 
  {
    toast.success("done")  
  }
  if (count<=0) 
  {
    deleteCart(id);
  }
}


async function deleteCart(id) 
{
const res =  await DelCartProduct(id);
console.log(res);
if (res.status === "success") 
{
  toast.success("product remooved")  
}
else
{
  toast.error("product dosen't removed")  
}
}

if (Cartproduct === null)  
{
  return<div className='d-flex vh-100 justify-content-center algin-item-center'>
 <Puff
      height="80"
      width="80"
      radius={1}
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}  />   
</div>      
}

if (Cartproduct.length == 0) 

{return<>
      <div className='container pt-5 mt-5'>
      <Link to={"/product"}><h1 className='main-color fontCart text-center mt-5 pt-5'>No product has added hereAdd Some Product</h1></Link>
      </div>
     </>  
}

 return <>
 <Helmet>
      <title>Shopping Cart</title>
 </Helmet>
     <div className='container bg-light'>
            <h2 className='ps-3 pt-4'> Shop Cart :  </h2>
            <h5 className='ps-3 pt-4'> Shop Cart :{totalCartPrice}  </h5>
            <h5 className='ps-3'> Total Items :{ numOfCartItems}</h5>
            <div className='d-flex justify-content-between'>
            <button onClick={deleteDataProduct} className='btn btn-outline-danger ms-3 mt-2  '>Clear Cart </button>
            <Link to={'/payment'}  className='btn btn-outline-primary me-4 mt-2 '>Confirm Payment </Link>
            </div>
            <div className='row border-bottom pt-3 pb-2 '>
            {Cartproduct.map(function (Product,idx) 
            {
              console.log(Product);
              return  <div className='col-md-12 border-bottom py-3' key={idx}>
              <div className='row'>
              <div className='col-md-6'>
                  <div className='row'>
                  <div className='col-md-3'>
                    <img className='w-100' src={Product.product.imageCover}/>
                  </div>
                  <div className='col-md-9 pt-5'>
                    <h2>{Product.product.id}</h2>
                    <h4>{Product.product.title} </h4>
                    <h4 className='main-color'>price : {Product.price} </h4>
                    <button onClick={()=>deleteCart(Product.product.id)} className='border border-transparent bg-transparent border-0 pt-3'><i className="fa-solid fa-trash-can main-color"></i><span className='fs-6 fw-bold '> Remove</span> </button>
                  </div>
                  </div>
                </div>
                <div className='col-md-6 pt-4 pe-5 '>
                 <div className=' d-flex justify-content-end'>
                 <button onClick={()=>increCount(Product.product.id ,Product.count+1 ) } className='btn btn-outline-success rounded-circle '> + </button> <h4 className='mx-1'>   {Product.count}  </h4> <button onClick={()=>decreCount(Product.product._id , Product.count-1 )} className='btn btn-outline-danger rounded-circle'>  ــ </button>
                 </div>
                </div>
              </div>
               </div>
            })}
            </div>
     </div>

  
        </>
}
