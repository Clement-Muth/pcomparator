import { IconButton } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import clsx from "clsx";
import { Grip, Heart } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import { Product } from "~/applications/Product/Domain/Product";
import { pcomparatorApiClient } from "~/clients/PcomparatorApiClient";
import Badge from "~/components/Badge/Badge";

const addZeroes = (number: number) =>
  number.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 });

const ProductPage = async ({ params }: { params: Params }) => {
  const product = await pcomparatorApiClient
    .get(`${process.env.PCOMPARATOR_API_ENDPOINT}/api/product/${params.productId}`, {
      cache: "no-store"
    })
    .json<Product>();

  return product ? (
    <div
      className={clsx(
        "w-full overflow-hidden shadow-xl",
        "dark:border-gray-600",
        "md:max-w-md md:rounded-2xl md:border md:border-gray-200"
      )}
    >
      <div
        className={clsx(
          "relative",
          "flex flex-col items-center justify-center space-y-3 border-b bg-white text-center",
          "dark:border-gray-600 dark:bg-black"
        )}
      >
        <Image
          src={product.image}
          alt="A house in a forest"
          width={300}
          height={200}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: "var(--radius-2)"
          }}
        />
        <div className="absolute right-3 top-3 flex flex-col space-y-2">
          <IconButton variant="solid" color="red" radius="full" size="2">
            <Heart />
          </IconButton>
          <IconButton variant="solid" color="red" radius="full" size="2">
            <Grip />
          </IconButton>
        </div>
      </div>
      <div className={clsx("flex flex-col space-y-4 bg-gray-50 px-4 py-5", "dark:bg-gray-950")}>
        <div className="grid space-y-3">
          <h2 className={clsx("font-bold text-2xl text-center")}>{product.name}</h2>
          <div className="flex space-x-2">
            <p>{addZeroes(product.price)}€</p>
            <Badge variant="green">{addZeroes(product.price)}$</Badge>
            <p>
              {product.unity === "unity"
                ? `${product.quantity} unité${product.quantity > 1 ? "s" : ""}`
                : product.unity === "g" || product.unity === "ml"
                ? `${product.quantity}${product.unity} (${product.quantity / 1000}${
                    product.unity === "g" ? "Kg" : "L"
                  })`
                : `${product.quantity} x ${product.weight}${product.unity === "unities-ml" ? "ml" : "g"}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductPage;
