import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import DashbordPage from './Features/Dashboard/DashbordPage';
import Authpage from './Features/Auth/Authpage';
import Login from './Features/Auth/Components/Login';
import ForgetPassword from './Features/Auth/Components/FogetPassword';
import Register from './Features/Auth/Components/Register';
import ChangePassword from './Features/Auth/Components/ChangePassword';
import { store } from './store';

import { ToastContainer } from "react-toastify";
import UserInfoComponent from './Components/UserInfoComponent';
import ResetPassword from './Features/Auth/Components/ResetPassword';
import Item from './Features/Item/Item';

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
      },
      {
        path: 'change-password', // ✅ Add this route
        element: <ChangePassword />
      },{
        path: 'reset-password', // ✅ Add this route
        element: <ResetPassword />
      } 
    ] 
  },
  {
    path: 'MyProfile',
    element: <UserInfoComponent />
  },
  {
    path:'Item',
    element: <Item />
  }
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <RouterProvider router={router} />
  </Provider>,
)
