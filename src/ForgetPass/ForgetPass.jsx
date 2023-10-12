import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgetPass() 
{
    async function forgetPassword () 
    {
     try 
     {
        const val = document.querySelector('input').value;
        console.log(val);
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { "email" : val}) 
        console.log(data);
        if (data.statusMsg == "success") 
        {
               toast.success(data.message) 
        }
     }
      catch (error) 
      {
        console.log(error);
     }
    }

   
  return <>
    <div className="container" >
        <h3>please enter your verification code</h3>
        <input className='w-100 border-light' type="text" id='mail' />
        <button onClick={forgetPassword} className='btn btn-outline-success mt-3'>Virfy</button>
    </div>
  
  
  </>
}
