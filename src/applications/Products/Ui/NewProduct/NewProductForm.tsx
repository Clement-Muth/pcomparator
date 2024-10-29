"use client";

import { Trans } from "@lingui/macro";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getProduct } from "~/applications/Products/Api/getProduct";
import type { Product } from "~/applications/Products/Domain/Entities/Product";
import type { Barcode } from "~/applications/Products/Domain/ValueObjects/Barcode";
import useForm from "~/components/Form/useForm";

export const NewProductForm = ({ barcode }: { barcode: Barcode | undefined }) => {
  const form = useForm();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      if (!barcode) return;

      setProduct(await getProduct({ barcode: { barcode: barcode.barcode, format: barcode.format! } }));
    })();
  }, [barcode]);

  return (
    <form.Form
      methods={form.methods}
      onSubmit={() => {}}
      actions={{
        nextProps: { title: <Trans>Add the product</Trans>, color: "primary" },
        wrapper: ModalFooter
      }}
    >
      <ModalBody>
        {barcode ? (
          <>
            <p>
              Your barcode: {barcode.barcode} formatted {barcode.format}
            </p>
            {product && (
              <>
                <p>{product.name}</p>
                {/* <Image src={product.image} width={200} height={150} alt="" /> */}
              </>
            )}
          </>
        ) : null}
      </ModalBody>
    </form.Form>
  );
};
