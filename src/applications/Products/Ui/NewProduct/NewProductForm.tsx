import { Trans } from "@lingui/macro";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import type { Barcode } from "~/applications/Products/Domain/Barcode";
import useForm from "~/components/Form/useForm";

export const NewProductForm = ({ barcode }: { barcode: Barcode | undefined }) => {
  const form = useForm();

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
          <p>
            Your barcode: {barcode.barcode} formatted {barcode.format}
          </p>
        ) : null}
      </ModalBody>
    </form.Form>
  );
};
