import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Barcode as BarcodeIcon } from "lucide-react";
import { Input, type InputProps } from "~/components/Inputs/Input/Input";

export const Barcode = (props: InputProps) => {
  const { i18n } = useLingui();

  return (
    <Input
      placeholder="8690804407383"
      label={<Trans>Barcode</Trans>}
      startContent={<BarcodeIcon />}
      description={t(i18n)`All barcode types are accepted.`}
      required={t`Please enter a valid barcode.`}
      {...props}
    />
  );
};
