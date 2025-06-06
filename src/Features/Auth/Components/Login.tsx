// import { Link } from "lucide-react"
import { Link } from "react-router"

function Login() {
  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
        
        <h2 className="text-2xl font-bold mb-6">Sign in</h2>

        <form>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 flex justify-between">
              <span>Password</span>
              <Link to="/auth/forgot-password" className="text-xs text-blue-500 cursor-pointer">Forgot Password?</Link> 
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition"
          >
            SIGN IN →
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-600">
          I don't have an account?{" "}
          <Link to="/auth/register" className="text-[#F1592A] cursor-pointer">Sign up</Link>
        </p>
      </div>
  )
}

export default Login