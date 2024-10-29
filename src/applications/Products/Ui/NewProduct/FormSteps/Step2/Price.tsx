import { Trans, t } from "@lingui/macro";
import { ModalBody, ModalFooter } from "@nextui-org/react";
import { Euro } from "lucide-react";
import useForm from "~/components/Form/useForm";
import { Input } from "~/components/Inputs/Input/Input";

interface PriceProps {
  onNextStep: ({ price }: { price: number }) => void;
  onPrevious: () => void;
}

export const Price = ({ onNextStep, onPrevious }: PriceProps) => {
  const form = useForm<{ price: string }>();

  return (
    <>
      <form.Form
        methods={form.methods}
        onSubmit={(data) => {
          onNextStep({ price: Number(data.price) });
        }}
        actions={{
          nextProps: { title: <Trans>Next</Trans>, color: "primary" },
          prevProps: { title: <Trans>Previous</Trans>, onPress: onPrevious },
          wrapper: ModalFooter
        }}
      >
        <ModalBody>
          {/* NOTE – Adding this hidden input to fix nextui modal error... */}
          <Input name="empty" className="hidden" hidden />
          <Input
            name="price"
            type="number"
            placeholder="9.99"
            label={<Trans>Price</Trans>}
            endContent={<Euro />}
            required={t`Please enter a valid price.`}
          />
        </ModalBody>
      </form.Form>
    </>
  );
};
