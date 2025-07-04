import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../store";
import Layout from "../Layout";
import Avtar from "./Common/Avtar";
import { FilePenLine, KeyRound } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { updateUserInfo, updateUserProfileImage } from "../Services/UserServices";
import { getUserInfo } from "../Services/AuthServices";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../Features/Auth/UserInfoSlice";

const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
})
type UpdateProfile = z.infer<typeof updateProfileSchema>;
function UserInfoComponent() {

  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfile>({
    resolver: zodResolver(updateProfileSchema)
  });

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    reset({
      firstName: userInfo.firstName || "",
      phoneNumber: userInfo.phoneNumber || "",
    });
  }, [userInfo]);

  async function initialiseUserInformation() {
    try {
      const userInfo: any = await getUserInfo();
      if (userInfo?.succeeded) {
        dispatch(setUserInfo(userInfo));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to fetch user information");
    }
  }

  async function onSubmit(data: UpdateProfile) {
    try {
      var respo = await updateUserInfo({ username: data.firstName, phoneno: data.phoneNumber });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile", error.message);
      
    }
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // 👈 backend expects "image", update if different

    try {
      setUploading(true);
      const toastId = toast.loading("Uploading image...");
      await updateUserProfileImage(formData);
      await initialiseUserInformation();
      toast.dismiss(toastId);
      // You might want to refresh the user info here
      // e.g., dispatch(fetchUserInfo()) or trigger a refetch

    } catch (err: any) {
      toast.error("Failed to upload image", err.message);
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  // Trigger file picker
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-3 h-full p-6 bg-gray-200">
        <div className="w-full md:w-1/3 flex flex-col h-full gap-3 bg-white  items-center p-3 md:p-5 rounded-2xl shadow-2xl">
          <div className="relative">
            <Avtar
              name={userInfo.firstName ?? "Unknown"}
              src={userInfo.profileimage ?? ""}
              size="32"
            />
            <div className="absolute -bottom-2 -right-2 top-3">
              <button onClick={triggerFileInput} className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                <ImagePlus className="h-4 w-4 text-red-600 cursor-pointer scale-105 transition-all ease-in duration-200" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <h2 className="text-lg font-semibold">{userInfo.firstName || "Jamed Allan"}</h2>
            <p className="text-gray-500">@{userInfo.email || "james"}</p>
            <p className="text-gray-400">{userInfo.phoneNumber || "No Phone number available"}</p>
          </div>

          <button
          onClick={triggerFileInput}
            type="submit"
            className="w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition"
          >
            UPDATE IMAGE <ImagePlus className="inline-block ml-2" />
          </button>
        </div>

        <div className="bg-white w-full rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">Update Your Profile</h2>
            <button
              type="button"
              className="bg-[#F1592A] text-white text-sm px-3 py-1 rounded-md hover:bg-[#e05226] transition flex items-center gap-1"
              onClick={() => setIsEditing(prev => !prev)}
            >
              {isEditing ? "SAVE" : "EDIT"} <FilePenLine className="text-sm" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex sm:flex-row flex-col gap-5">
              <div className="w-full">
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("firstName")}
                  disabled={!isEditing}
                  className={`w-full text-sm px-3 py-1 mt-1 border ${isEditing ? "bg-white" : "bg-gray-200"
                    } border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div className="w-full">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="test@gmail.com"
                  value={userInfo.email}
                  disabled
                  className="w-full text-sm px-3 py-1 mt-1 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>


            <div className=" flex flex-row gap-5 items-center ">
              <div className="flex flex-col w-[50%]">
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  disabled
                  className=" text-sm px-3 py-1 mt-1 border bg-gray-200 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button onClick={() => navigate("/auth/reset-password")} type="button" className="bg-[#F1592A] text-white text-xs px-3 py-1 rounded-md hover:bg-[#e05226] transition cursor-pointer flex flex-row gap-2">
                change password <KeyRound />
              </button>
            </div>

            <div className="w-full">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                disabled={!isEditing}
                className={`w-full text-sm px-3 py-1 mt-1 border ${isEditing ? "bg-white" : "bg-gray-200"
                  } border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400`}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-[#F1592A] text-white py-2 rounded-md mt-2 hover:bg-[#e05226] transition ${isEditing ? "" : "opacity-50 cursor-not-allowed"
                }`}
              disabled={!isEditing}
            >
              Update →
            </button>
          </form>
        </div>

      </div>
    </Layout>

  );
}

export default UserInfoComponent;