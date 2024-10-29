import { Trans } from "@lingui/macro";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import _ from "lodash";
import type { Product } from "~/applications/Products/Domain/Entities/Product";
import useForm from "~/components/Form/useForm";
import { Barcode } from "~/components/Inputs/Input/Barcode";
import { Input } from "~/components/Inputs/Input/Input";

interface TypeBarcodeProps {
  onNextStep: ({ barcode }: { barcode: string }) => void;
  onCheckBarcode: (barcode: string) => Promise<Product | null>;
}

export const TypeBarcode = ({ onNextStep, onCheckBarcode }: TypeBarcodeProps) => {
  const form = useForm<{ barcode: string; empty: never }>();

  return (
    <>
      <form.Form
        methods={form.methods}
        onSubmit={async (data) => {
          // const product = await onCheckBarcode(data.barcode);

          onNextStep({ ..._.omit(data, "empty"), ...{ barcode: data.barcode } });
        }}
        actions={{
          nextProps: { title: <Trans>Next</Trans>, color: "primary", type: "submit" },
          wrapper: ModalFooter
        }}
      >
        <ModalBody>
          {/* NOTE – Adding this hidden input to fix nextui modal error... */}
          <Input name="empty" className="hidden" hidden />
          <Barcode name="barcode" />
        </ModalBody>
      </form.Form>
    </>
  );
};
