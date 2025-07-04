import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toast } from "react-toastify";
import { GetItems } from "../../../Services/Itemsrvice";
import { fetchItemsFailure, fetchItemsStart, fetchItemsSuccess } from "../ItemsSlice";
import ProductCard from "./ProductCard";

function ItemSection() {
  const dispatch = useAppDispatch();
  const ItemState=useAppSelector(state => state.items);

  const initialiseItems = async () => {
    try{
      dispatch(fetchItemsStart());
      const respo=await GetItems();
      if(respo.success){
        // Dispatch success action with the fetched items
        dispatch(fetchItemsSuccess(respo));
      } else {
        toast.error(respo.error);
      }
    }catch(error: any){
      console.log(error)
      dispatch(fetchItemsFailure(error.message))
      toast.error(error.message)
    }
  };

  useEffect(() => {
    initialiseItems();
  }, []);

  //  useEffect(() => {
  //   console.log("Items updated:", ItemState.items);
  // }, [ItemState]);



  return (
    <div className="p-10 bg-white shadow-md mt-4">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Item Section</h2>
      {ItemState.loading && <p>Loading...</p>}
      {ItemState.error && <p className="text-red-500">{ItemState.error}</p>}
      <div className="mt-4 flex flex-row  justify-between flex-wrap gap-4">
        {ItemState.items.map(item => (
          <ProductCard key={item.itemName} product={item}  onAddToCart={() => {}}/>
        ))}
      </div>
    </div>
  )
}

export default ItemSection