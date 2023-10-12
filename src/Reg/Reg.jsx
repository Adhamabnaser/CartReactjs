import React, { useState } from 'react'
import regCSS from './reg.module.css'
import { useFormik } from 'formik'
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';


export default function Reg() {

let user =  { name : "", email: "",password:"",repassword:"",number:"" };
const [errMsg , seterrMsg] = useState(null);
const [succMsg , setsuccMsg] = useState(null);
const [IsLoad , setIsLoad] = useState(false);

const navigate = useNavigate();
async function sendNewReg (values) 
          {
            console.log(values);
            setIsLoad (true);
            // // Api  
            // console.log("sending......");
            // const {data} =  await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
            // .catch(function (error) 
            // {
            // console.log(error.response.data);  
            // })
            // console.log(data);
            
                try
                {
                      const {data} =  await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values) 
                      console.log(data);
                      if (data.message == "success") 
                      {
                        setsuccMsg("Account has created Successfully");
                        setTimeout(navigate('/'),1000)
                      }
                }
                catch(err)
                {
                  console.log(err.response.data.errors);
                  seterrMsg(err.response.data.errors)

                }

                setIsLoad(false);

          }


const formikObj =  useFormik
      ({
        initialValues : user ,
        onSubmit : sendNewReg,
      
        validate : function (values) 
        {
        // console.log("validate.....", values);  
                  // const phoneRegEx = /^(20)?01[0125][0-9]{8}$/;
          seterrMsg(null);
          const err = {};
          if (values.name.length < 4 || values.name.length > 8)
          {
            err.name = "length should be from 4 to 10"
          }
          if (values.email.includes ("@")=== false || values.email.includes (".")=== false)
          {
            err.email = "Invalid E-Mail"
          }
          if (!values.number.match(/^01[0125][0-9]{8}$/))
          {
            err.number = "Phone is Invalid"
          }
          if (values.password.length < 6 || values.password.length > 12)
          {
            err.password = "length should be from 6 to 12"
          }
          if (values.repassword !== values.password)
          {
            err.repassword = "password and repassword dosen't match"
          }
          return err ;
        }


      })





  return <>

<div className='container pt-5'>
        <h3 className='pb-3'>Register Now :</h3>
        <form onSubmit={formikObj.handleSubmit} >
            {errMsg? <div class="alert alert-danger text-center mt-2 " role="alert">E-mail Alredy Exists</div>:""}
            {succMsg? <div class="alert alert-success text-center mt-2 " role="alert">{setsuccMsg} </div>:""}

            <label className='d-block'>Name:</label> 
            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} className= {regCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="text" id='name'/>
            {formikObj.errors.name && formikObj.touched.name ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.name}</div> :""}

            <label className='d-block'>E-mail:</label>
            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.emial} className= {regCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="email" id='email' />
            {formikObj.errors.email && formikObj.touched.email ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.email}</div> :""}

            <label className='d-block'>Password:</label>
            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.password}className= {regCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="password" id='password' />
            {formikObj.errors.password && formikObj.touched.password ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.password}</div> :""}

            <label className='d-block'>Re-password:</label>
            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.repassword} className= {regCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="password"  id='repassword'/>
            {formikObj.errors.repassword && formikObj.touched.repassword ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.repassword}</div> :""}

            <label className='d-block'>Phone:</label>
            <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.namber} className= {regCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="number  " id='number' />
            {formikObj.errors.number && formikObj.touched.number ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.number}</div> :""}

            <div className='d-flex justify-content-end'>
            <button className='btn btn-outline-dark fs-5 my-3 ' type='submit' disabled={(!formikObj.isValid || formikObj.dirty == false)} > 
            
            {IsLoad? <ProgressBar
                  height="50"
                  width="50"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor = 'black'
                  barColor = 'black'
            />
              : "Regsiter Now"}
           
           
            </button>
            </div>
        </form>
</div>  
  
  </>
}
