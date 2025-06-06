import authImage from '../../assets/Auth.png'
import { Outlet } from 'react-router'
import logo from '../../assets/RentItupLogo.png'
function Authpage() {
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