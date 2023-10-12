import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Reg from './Reg/Reg';
import Login from './Login/Login';
import Product from './Product/Product';
import Profile from './Profile/Profile';
import HomeSlider from './HomeSlider/HomeSlider';
import Cart from './Cart/Cart';
import Wish from './Wish/Wish';
import Categories from './Categories/Categories';
import Brands from './Brands/Brands';
import NotFound from './NotFound/NotFound';
import Authprovider from './Context/Authentication';
import ProtectedRoute from './Test/Test';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContex';
import { Toaster } from 'react-hot-toast';
import Payment from './Payment/Payment';
import AllOrders from './AllOrders/AllOrders';
import { Offline } from 'react-detect-offline';
import CategoryDetails from './CategoryDetails/CategoryDetails';
import ForgetPass from './ForgetPass/ForgetPass';


const route = createHashRouter (
[
  {
    path :"", element :  <Authprovider> <Layout/> </Authprovider>
    
    ,children : 
    [
      {  path : '', element :<ProtectedRoute><Product/></ProtectedRoute>     },

     
      
      {  path : "/Product",element : <ProtectedRoute> <Product/> </ProtectedRoute> },
      {  path : "/categories",element : <ProtectedRoute> <Categories/> </ProtectedRoute>   },
      {  path : "/brands",element :<ProtectedRoute> <Brands/> </ProtectedRoute>    },


      {  path : "/ProductDetails/:id",element : <ProtectedRoute> <ProductDetails/> </ProtectedRoute>  },
      {  path : "/categoryDetails/:id",element : <ProtectedRoute> <CategoryDetails/> </ProtectedRoute>  },

      {  path : "/profile",element : <ProtectedRoute> <Profile/> </ProtectedRoute>  },
      {  path : "/cart",element : <ProtectedRoute> <Cart/> </ProtectedRoute>  },
      {  path : "/payment",element : <ProtectedRoute> <Payment/> </ProtectedRoute>  },
      {  path : "/allorders",element : <ProtectedRoute> <AllOrders/> </ProtectedRoute>  },

      {  path : "/reg",element : <Reg/>   },
      {  path : "log",element : <Login/>    },
      {  path : "/forgetPass",element : <ForgetPass/>    },



      {  path : "*",element : <NotFound/>   },


    ] 
  }
]


)
export default function App() {
      let clientQuery = new QueryClient ();

  return <> 
        <QueryClientProvider client={clientQuery}>
            <CartContextProvider>
              <Authprovider>  
                  <RouterProvider router={route} />
              </Authprovider>
            </CartContextProvider>
            <Toaster/>
        </QueryClientProvider>

        <Offline>
          <div className='position-fixed bottom-0 start-0 bg-dark text-white p-3 rounded-3'>
            <h2>Ooooooooops.. You are Offline now.</h2>
          </div>
        </Offline>
  </>
}
