
import { Link } from "react-router"


function Register() {
  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>

      <form>
        

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="test@gmail.com"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition"
        >
          SIGN UP →
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#F1592A] cursor-pointer">Sign in</Link>
      </p>
    </div>
  );
}

export default Register;
