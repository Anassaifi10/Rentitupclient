import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router"
import { z } from "zod";
import { changePassword } from "../../../Services/AuthServices";
import { toast } from "react-toastify";
const changepasswordschema=z.object({
password:z.string().min(6,"Password must be strong"),
confirmPassword:z.string().min(6,"Confirm Password must be strong")
}).refine((data)=>
    data.password === data.confirmPassword,{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

type changepasswordform=z.infer<typeof changepasswordschema>


function ChangePassword() {
     const [searchParams] = useSearchParams();
     const navigator=useNavigate();
     const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:zodResolver(changepasswordschema)
     })

 

 const submit=async (data:changepasswordform)=>{
   const token = searchParams.get("token");
   const email = searchParams.get("email");

   if (!token || !email) {
     // Handle missing token or email
     return;
   }

   try {
     // Call your API to change the password
     const newpassword=data.password;
     const response= await changePassword(token, email, newpassword);
     if (response.success) {
         toast.success("Password changed successfully");
         navigator("/auth/login");
         // Handle successful password change
     } else {
       // Handle failed password change
       toast.error("Failed to change password");
     }
   } catch (error) {
     console.error("Error changing password:", error);
     toast.error("Failed to change password");
   }
 }

  return (
      <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(submit)}>
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
          Change Password →
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-600">
        If You Know the Password?{" "}
        <Link to="/auth/login" className="text-[#F1592A] cursor-pointer">Sign in</Link>
      </p>
    </div>
  )
}

export default ChangePassword