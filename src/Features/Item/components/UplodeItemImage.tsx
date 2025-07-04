import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


type UploadItemImageProps = {
  data: { imageFile: FormData | null };
  updateData: (newData: { imageFile: FormData | null }) => void;
};

const UploadItemImage=forwardRef(({ data, updateData }: UploadItemImageProps, ref) => {

  const imageref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  const triggerFileInput = () => {
    imageref.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const url = URL.createObjectURL(file);
    setPreview(url);
    const formdata=new FormData();
    formdata.append("image", file);
    updateData({ imageFile: formdata });
  };

   useEffect(() => {
    // If parent state changes (e.g., going back), update preview
    if (data.imageFile) {
      const image = data.imageFile.get("image");
      if (image && image instanceof Blob) {
        setPreview(URL.createObjectURL(image));
      } else {
        setPreview("");
      }
    } else {
      setPreview("");
    }
  }, [data.imageFile]);

  function saveUploadedImage() {
    // Here you can implement the logic to save the uploaded image
    updateData({ imageFile: data.imageFile });
  }

      useImperativeHandle(ref,()=>({
        callSave: ()=>{
          saveUploadedImage();
          return true;
        }
      }));
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={triggerFileInput}
        className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
      >
        Upload Image
      </button>
      <input
        type="file"
        ref={imageref}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-md border border-gray-300 shadow-sm"
        />
      ) : (
        <div className="w-48 h-48 flex items-center justify-center border border-dashed border-gray-300 rounded-md text-gray-400">
          No image selected
        </div>
      )}
    </div>
  );
});

export default UploadItemImage;
