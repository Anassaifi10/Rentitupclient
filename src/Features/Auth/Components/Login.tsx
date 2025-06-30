import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { login } from "../../../Services/AuthServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ✅ Zod Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Inferred Type from Schema
type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  }); 

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    // Call login API here
    try {
      const response = await login(data.email, data.password);
      if (response) {
        toast.success("Login successful!");
        // Navigate to the dashboard or another page
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="bg-white w-full max-w-sm rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign in</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="test@gmail.com"
            {...register("email")}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 flex justify-between">
            <span>Password</span>
            <Link to="/auth/forgot-password" className="text-xs text-blue-500">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
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
        <Link to="/auth/register" className="text-[#F1592A]">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
