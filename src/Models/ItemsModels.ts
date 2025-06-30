
export interface Item {
    itemName: string;
    description: string;
    price: number;
    priceType: ItemPriceType;
    isAvailable: boolean;
    ownerId: string;
    imageurl: string;
}

export enum ItemPriceType {
    Day, Hour
}