import { Plus } from "lucide-react";
import Image from "next/image";
import { LegacyRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputImageProps extends UseFormRegisterReturn {
  src?: string;
}

const InputImage = forwardRef(({ src, ...register }: InputImageProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <label htmlFor={register.name}>
      {!src ? (
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
          <Plus />
        </div>
      ) : (
        // <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9">
        <Image
          src={src}
          width={40}
          height={40}
          alt="uploaded product picture"
          className="rounded-full h-10 w-10"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        // </div>
      )}
      <input type="file" id={register.name} hidden {...register} ref={ref} />
    </label>
  );
});

export default InputImage;
