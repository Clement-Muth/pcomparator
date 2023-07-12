import { Plus } from "lucide-react";
import Image from "next/image";

const InputImage = () => {
  return (
    <>
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
        <Plus />
      </div>
      <input type="file" hidden />
    </>
  );
};

export default InputImage;
