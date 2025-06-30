import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";



const Resetpasswordschema=z.object({    
    oldpassword:z.string().min(6,"Password must be strong"),
password:z.string().min(6,"Password must be strong"),
confirmPassword:z.string().min(6,"Confirm Password must be strong")
}).refine((data)=>
    data.password === data.confirmPassword,{
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
).refine((data) => data.oldpassword === data.password, {
    message: "New password must be different from old password",
    path: ["password"],
});

type changepasswordform=z.infer<typeof Resetpasswordschema>



function ResetPassword() {
    const {register,handleSubmit,formState:{errors}}=useForm({
            resolver:zodResolver(Resetpasswordschema)
         })

    const submit=async (data:changepasswordform)=>{

        console.log(data);
   }

  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(submit)}>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Old Password</label>
          <input
            type="Oldpassword"
            placeholder="********"
            {...register('oldpassword')}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">New Password</label>
          <input
            type="password"
            placeholder="********"
            {...register('password')}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            {...register('confirmPassword')}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition"
        >
          Reset Password →
        </button>
      </form>

    </div>
  )
}

export default ResetPassword