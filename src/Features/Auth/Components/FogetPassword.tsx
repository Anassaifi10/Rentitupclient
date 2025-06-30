import { useState } from "react";
import { Link } from "react-router";



function ForgetPassword() {

  const [email,setEmail]=useState("");
  const [error,setError]=useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(true);
    } else {
      setError(false);
      // Call API to send reset link
    }
  };

  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Enter your email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition"
        >
          SEND RESET LINK →
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-600">
        Remember your password?{" "}
        <Link to="/auth/login" className="text-[#F1592A] cursor-pointer">Sign in</Link>
      </p>
    </div>
  );
}

export default ForgetPassword;
