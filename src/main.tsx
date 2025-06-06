import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import DashbordPage from './Features/Dashboard/DashbordPage';
import Authpage from './Features/Auth/Authpage';
import Login from './Features/Auth/Components/Login';
import ForgetPassword from './Features/Auth/Components/FogetPassword';
import Register from './Features/Auth/Components/Register';

const router=createBrowserRouter([
  {
    path:'/',
    element:<DashbordPage/>
  },
  {
    path:'/auth',
    element:<Authpage/>,
    children:[
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'forgot-password',
        element:<ForgetPassword/>
      }
    ] 
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
