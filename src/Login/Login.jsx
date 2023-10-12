import logCSS from './login.module.css'
import {React, useContext, useState } from 'react'
import { useFormik } from 'formik'
import  Axios  from 'axios';
import { Link, json, useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';
import { authcontext } from '../Context/Authentication';
import { Helmet } from 'react-helmet';



export default function Login() {

 const {token , setToken} = useContext(authcontext);

  let user =  { email: "",password:"" };
  const [errMsg , seterrMsg] = useState(null);
  const [succMsg , setsuccMsg] = useState(null);
  const [IsLoad , setIsLoad] = useState(false);
  
  const navigate = useNavigate();
  async function sendNewReg (values) 
            {
              // console.log(values);
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
                        const {data} =  await Axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",
                        values) 
                        // console.log(data);
                        if (data.message == "success") 
                        {
                          localStorage.setItem('tkn', data.token)
                          setToken(data.token);
                          setsuccMsg("welcome");
                          setTimeout(navigate('/Product'),500);
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
          
            if (values.email.includes ("@")=== false || values.email.includes (".")=== false)
            {
              err.email = "Invalid E-Mail"
            }
           
            if (values.password.length < 6 || values.password.length > 12)
            {
              err.password = "length should be from 6 to 12"
            }
            
            return err ;
          }
  
  
        })
  
  
  
  
  
    return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
  
  <div className='container pt-5'>
          <h3 className='pb-3'>Login:</h3>
          <form onSubmit={formikObj.handleSubmit} >

              {errMsg ? <div class="alert alert-danger text-center mt-2 " role="alert">E-mail or password may be incorrect</div>:""}
              {succMsg ? <div class="alert alert-success text-center mt-2 " role="alert">{setsuccMsg} </div>:""}
             
              
              <label className='d-block'>E-mail:</label>
              <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.email} className= {logCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="email" id='email' />
              {formikObj.errors.email && formikObj.touched.email ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.email}</div> :""}
  
              <label className='d-block'>Password:</label>
              <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}  value={formikObj.values.password}className= {logCSS.h + ' ' +' ps-2 border border-light rounded-1 w-100'} type="password" id='password' />
              {formikObj.errors.password && formikObj.touched.password ?<div class="alert alert-light text-center mt-2 " role="alert">{ formikObj.errors.password}</div> :""}
  
            
              
              <div className='d-flex justify-content-between'>
                <Link className='aa' to={"/forgetPass"}> <h3 className='pt-3 '>Forget Password ?</h3></Link>
              <button className='btn btn-outline-dark fs-5 my-4 px-5' type='submit' disabled={(!formikObj.isValid || formikObj.dirty == false)} > 
              
              {IsLoad? <ProgressBar
                    height="25"
                    width="50"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = 'black'
                    barColor = 'black'
              />
                : "Login"}
             
             
              </button>
              </div>
          </form>
  </div>  
    
    </>
  
  
}
