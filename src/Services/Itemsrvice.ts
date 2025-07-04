import instance from "../axios";
import type { Item } from "../Models/ItemsModels";


export const GetItems = async () => {
    const response = await instance("Items/GetItem");
    return response.data;
};

export const CreateItem = async (data: Partial<Item>) => {
    const response = await instance.post("Items/CreateItem", data);
    return response.data;
};

export const UplodeImageItemservice=async(image: FormData,imageId:string) => {
    const response = await instance.post(`Image/uplodeImage?imageInfo=${imageId}`, image, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout:5000
    });
    return response.data;
}