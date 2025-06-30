import instance from "../axios";


export const GetItems = async () => {
    const response = await instance("Items/GetItem");
    return response.data;
};
