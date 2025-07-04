import Layout from "../../Layout"
import { useMemo, useRef, useState } from "react";
import UplodeItemImage from "./components/UplodeItemImage";
import ItemCreate from "./pages/ItemCreate";
import { toast } from "react-toastify";
import { CreateItem, UplodeImageItemservice } from "../../Services/Itemsrvice";
import { useNavigate } from "react-router";



const steps = [
  { title: 'Add Item Details', component: ItemCreate },
  { title: 'Upload Item Image', component: UplodeItemImage },
];

function Item() {
  const [step, setStep] = useState(0);
  const navigator=useNavigate();
  const StepComponent = useMemo(() => steps[step].component, [step]);

  const saveref=useRef<{callSave: () => Promise<boolean>}>(null)

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: 0,
    priceType: 0,
    imageFile: null as FormData | null,
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
    console.log(newData);
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmitAll = async () => {
    // Here you can send formData to your backend or process it
    console.log("Submitting all data:", formData);
    debugger;
    try
    {
      const respo=await CreateItem(formData);
      console.log(respo);
        if(respo&&!respo?.errors)
        {
          toast.success("Item created successfully");
          if(formData.imageFile)
          {
            const loadingimageinstance=toast.loading("Uploading image...");
           const response=await UplodeImageItemservice(formData.imageFile, respo );
            if(response.succeeded)
            {
              toast.success("Image uploaded successfully");
              toast.dismiss(loadingimageinstance);
            }
            else
            {
              toast.error("Image upload failed");
            }
          }
          navigator("/");
        }
      } catch (e: any) {
      toast.error(e.message);
    }

  };

  const handleNext = async() => {
    var res=await saveref.current?.callSave();
    console.log(res);
    if(!res) return;
    if (step === steps.length - 1) {
      await handleSubmitAll();
    } else {
      setStep(step + 1);
    }
  };
  return (
    <Layout>
      <div className="flex items-center justify-between px-4 mt-4 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 transition-all duration-500 ease-in-out mx-1 rounded-full ${i < step
              ? 'bg-orange-500 w-full'
              : i === step
                ? 'bg-orange-400 w-8 scale-125'
                : 'bg-gray-300 w-full'
              }`}
          ></div>
        ))}
      </div>

      <div className="flex justify-around items-center mt-6">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          className="bg-gray-300 px-6 py-2 rounded shadow font-medium disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() => handleNext()}
          className="bg-orange-800 text-white px-6 py-2 rounded shadow font-medium"
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>

      <h3 className="text-center text-lg font-semibold my-4 text-gray-700">
        {steps[step].title}
      </h3>
      <StepComponent data={formData} updateData={updateFormData} ref={saveref} />
    </Layout>
  );
}

export default Item