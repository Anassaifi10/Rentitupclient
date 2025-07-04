import  { useForm } from "react-hook-form";
import { ItemPriceType } from "../../../Models/ItemsModels"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle, useRef, type HtmlHTMLAttributes } from "react";

const ItemRegistrationSchema=z.object({
    itemName:z.string().min(2).max(100),
    description:z.string().min(10).max(1000),
    price:z.number().min(1).max(1000),
    priceType:z.number()
})

type ItemRegistrationType=z.infer<typeof ItemRegistrationSchema>;
type ItemCreateProps = {
  data: Partial<ItemRegistrationType>;
  updateData: (newData: Partial<ItemRegistrationType>) => void;
};

const ItemCreate=forwardRef(({ data, updateData }: ItemCreateProps, ref) => {
  const savingbuttonref=useRef<HTMLButtonElement>(null);
    const { register, handleSubmit, formState: { errors }, reset,
    watch, } = useForm<ItemRegistrationType>({
        resolver:zodResolver(ItemRegistrationSchema),
        defaultValues:data
    })



   useEffect(() => {
    reset(data); // Reset form values when parent data changes (e.g. when going back)
  }, [data, reset]);

    const PriceTypeObject=Object.values(ItemPriceType).filter(value=>typeof value === "string");
    function ItemFormSubmit(data: ItemRegistrationType)
    {
      console.log("Submitting item form:", data);
      updateData(data);
    }

    useImperativeHandle(ref, () => ({
      callSave: () => {
        return new Promise<boolean>((resolve) => {
          handleSubmit((data) => {
            updateData(data);
            resolve(true);
          }, () => {
            resolve(false);
          })();
        });
      }
    }));

  return (
    <div className="p-5">

      <form className="w-full max-w-3xl mx-auto mt-6 space-y-5" onSubmit={handleSubmit(ItemFormSubmit)}>
      {/* Item Name */}
      <div>
        <label htmlFor="itemName" className="text-sm text-gray-600">
          Item Name
        </label>
        <input
          type="text"
          id="itemName"
          placeholder="Enter item name"
          required
          {...register("itemName")}
          className="w-full text-sm px-3 py-2 mt-1 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.itemName && (
            <p className="text-sm text-red-500 mt-1">{errors.itemName.message}</p>
          )}
      </div>


      {/* Item Description */}
      <div>
        <label htmlFor="description" className="text-sm text-gray-600">
          Item Description
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Enter item description"
          required
          {...register("description")}
          className="w-full text-sm px-3 py-2 mt-1 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
      </div>

      {/* Item Price Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="price1" className="text-sm text-gray-600">
            Item Price
          </label>
          <input
            type="number"
            id="price1"
            {...register("price",{valueAsNumber:true})}
            placeholder="0.00"
            required
            className="w-full text-sm px-3 py-2 mt-1 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="priceType" className="text-sm text-gray-600">
            Price type
          </label>
          <select
            id="priceType"
            {...register("priceType",{valueAsNumber:true})}
            required
             className="w-full text-sm px-3 py-2 mt-1 border bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400">
            {PriceTypeObject.map((priceType,index) => (
              <option  key={priceType} value={index}>
                {priceType}
              </option>
            ))}
          </select>
          {errors.priceType && (
            <p className="text-sm text-red-500 mt-1">{errors.priceType.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#F1592A] text-white py-2 rounded-md hover:bg-[#e05226] transition"
       ref={savingbuttonref}
      >
        Create Item →
      </button>
    </form>
    </div>
  )
})

export default ItemCreate