
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router"
import { toast } from "react-toastify";
import { z } from "zod";
import { Signup } from "../../../Services/AuthServices";
import { useNavigate } from "react-router";

const registerschema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
type registerForm = z.infer<typeof registerschema>;
function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<registerForm>(
    {
      resolver: zodResolver(registerschema)
    }
  );
  const onSubmit = async (data: registerForm) => {
    try {
      // Call register API here
      const respo = await Signup(data.email, data.password)
      console.log(respo)
      toast.success("Registration successful");
      navigate("/auth/login");
    } catch (error) {
      toast.error("Email is already register ");
    }
  };
  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="test@gmail.com"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register('password')}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
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
