import instance from "../axios";

export const login = async (email: string, password: string) => {

    const response = await instance.post("Users/login", { email, password });
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
 
}

export const Signup = async (email: string, password: string) => {

    const response = await instance.post("Users/register", { email, password });
    console.log(response)
    return response.data;

}

export const forgotPassword = async (email: string) => {
  try {
    const response = await instance.post("Users/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const changePassword = async (token: string, email: string, newPassword: string) => {
  try {
    const response = await instance.post("Users/change-password", { token, email, newPassword });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserInfo = async () => {
  try {
    const response = await instance.get("UserAccount/GetMyInfo");
    return response.data;
  } catch (error) {
    // window.location.href = "/auth/login";
    console.log("Error fetching user info:", error);
  }
}

