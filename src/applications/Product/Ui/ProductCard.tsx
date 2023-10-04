"use client";

import { IconButton } from "@radix-ui/themes";
import clsx from "clsx";
import { Grip, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import imageTemplateProduct from "public/static/images/templates/products/milk-template.webp";
import Badge from "~/components/Badge/Badge";
import addZeroes from "~/core/addZeroes";

export interface ProductCardProps {
  categoryId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unity: "g" | "ml" | "unity" | "unities-g" | "unities-ml";
  weight: number;
  image: string;
}

const ProductCard = ({
  productId,
  categoryId,
  name,
  price,
  quantity,
  unity,
  weight,
  image
}: ProductCardProps) => {
  const pathname = usePathname();

  return (
    <Link href={`/product/${categoryId}/${productId}/`}>
      <div
        className={clsx(
          "w-full overflow-hidden shadow-xl rounded-md",
          "dark:border-gray-600",
          "md:max-w-md md:rounded-2xl md:border md:border-gray-200"
        )}
      >
        <div
          className={clsx(
            "relative !h-[200px]",
            "flex flex-col items-center justify-center space-y-3 border-b bg-white text-center",
            "dark:border-gray-600 dark:bg-black"
          )}
        >
          <Image
            src={image.length ? image : imageTemplateProduct}
            alt="A house in a forest"
            layout="fill"
            className="w-full !h-[200px]"
            style={{
              objectFit: "cover"
            }}
          />
          {/* <div className="absolute right-3 top-3 flex flex-col space-y-2">
          <IconButton variant="solid" color="red" radius="full" size="2">
            <Heart />
          </IconButton>
          <IconButton variant="solid" color="red" radius="full" size="2">
            <Grip />
          </IconButton>
        </div> */}
        </div>
        <div className={clsx("flex flex-col space-y-4 bg-gray-50 px-4 py-5", "dark:bg-gray-950")}>
          <div className="grid space-y-3">
            <h2 className={clsx("font-bold text-2xl text-center")}>{name}</h2>
            <div className="flex space-x-2">
              <p>{addZeroes(price)}€</p>
              <Badge variant="green">{addZeroes(price)}$</Badge>
              <p>
                {unity === "unity"
                  ? `${quantity} unité${quantity > 1 ? "s" : ""}`
                  : unity === "g" || unity === "ml"
                  ? `${quantity}${unity} (${quantity / 1000}${unity === "g" ? "Kg" : "L"})`
                  : `${quantity} x ${weight}${unity === "unities-ml" ? "ml" : "g"}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
