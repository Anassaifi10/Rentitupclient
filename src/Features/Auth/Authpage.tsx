import authImage from '../../assets/Auth.png'
import { Outlet, useLocation, useNavigate } from 'react-router'
import logo from '../../assets/RentItupLogo.png'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
function Authpage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    console.log(location.pathname)
    if(location.pathname!=='/auth/reset-password'&&(localStorage.getItem('accessToken')||localStorage.getItem('refreshToken'))) {
      toast.info("You are already logged in");
      navigate("/");
    }
    else{
      console.log("you need Login")
    }
  },[])
  return (
    // <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="w-full h-screen  flex flex-col md:flex-row overflow-hidden ">
        {/* Left: Auth Form */}
        <div className="w-full  flex flex-col items-center justify-center p-8">
            <img src={logo} alt="Logo" className="mb-4" />
          <Outlet />
        </div>

       <img src={authImage} alt="auth" className="max-w-full h-screen" />
       
      </div>
    // </div>
  )
}

export default Authpage