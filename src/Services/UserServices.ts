import instance from "../axios";


export const updateUserInfo = async (userData: {username: string, phoneno: string}) => {

    const response = await instance.put("UserAccount/updateProfile", userData);
    return response.data;
}

export const updateUserProfileImage = async (formData: FormData) => {

    const response = await instance.put("UserAccount/UpdateUserImage", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        ,
         timeout: 10000
    });
    return response.data;
}
export const changePassword= async (oldPassword: string, newPassword: string) => {

    const response = await instance.put("UserAccount/changePassword", { oldPassword, newPassword });
    return response.data;
}