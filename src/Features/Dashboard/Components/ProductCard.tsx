import type { Item } from "../../../Models/ItemsModels";
import { ItemPriceType } from "../../../Models/ItemsModels";
import { IndianRupee } from "lucide-react";

const ProductCard = ({ product, onAddToCart }: { product: Item; onAddToCart: (product: any) => void }) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-md p-4 max-w-xs border border-gray-200 ">
            <img
                src={product.imageurl}
                alt={product.itemName}
                className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-md font-semibold text-gray-800 line-clamp-2">{product.itemName}</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
            <div className="flex gap-2 mt-2 text-sm sm:text-lg">

                <span className=" font-bold text-green-700 "><IndianRupee className="inline w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />{product.price}</span> <span>/ {ItemPriceType[product.priceType]}</span>
            </div>
            <button
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-black font-medium py-2 rounded-md cursor-pointer"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
