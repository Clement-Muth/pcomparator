import { Trans, t } from "@lingui/macro";
import { Button, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Camera, Euro } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TakePicture } from "~/applications/Products/Ui/NewProduct/FormSteps/Step2/TakePicture";
import useForm from "~/components/Form/useForm";
import { Input } from "~/components/Inputs/Input/Input";

interface PriceProps {
  onNextStep: ({ price, proof }: { price: number; proof: string }) => void;
  onPrevious: () => void;
}

export const Price = ({ onNextStep, onPrevious }: PriceProps) => {
  const form = useForm<{ price: string }>();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [proof, setProof] = useState<string | null>(null);

  return (
    <>
      <form.Form
        methods={form.methods}
        onSubmit={(data) => {
          onNextStep({ price: Number(data.price), proof: proof! });
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
          {/* <File
            name="proof"
            label={<Trans>Proof</Trans>}
            required={t`Please choose a valid proof.`}
            description={<Trans>Both the price tag and the product are visible</Trans>}
          /> */}

          <TakePicture
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onProofTaken={(proof) => setProof(proof)}
            onClose={onClose}
          />

          <Button startContent={<Camera />} onPress={onOpen}>
            <Trans>Take a picture</Trans>
          </Button>

          {proof && <Image src={proof} width={100} height={200} alt="" />}
        </ModalBody>
      </form.Form>
    </>
  );
};
