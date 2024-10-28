import { Trans } from "@lingui/macro";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import useForm from "~/components/Form/useForm";
import { Barcode } from "~/components/Inputs/Input/Barcode";

export const TypeBarcode = () => {
  const form = useForm();

  return (
    <>
      <ModalHeader>
        <h3>
          <Trans>Add a new product</Trans>
        </h3>
      </ModalHeader>
      <form.Form
        methods={form.methods}
        onSubmit={() => {}}
        actions={{
          nextProps: { title: <Trans>Add the product</Trans>, color: "primary" },
          wrapper: ModalFooter
        }}
      >
        <ModalBody>
          <Barcode name="barcode" />
        </ModalBody>
      </form.Form>
    </>
  );
};
