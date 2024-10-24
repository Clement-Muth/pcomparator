import { Trans } from "@lingui/macro";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import useForm from "~/components/Form/useForm";

export const NewProductForm = () => {
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
        <p>test</p>
      </ModalBody>
    </form.Form>
  );
};
