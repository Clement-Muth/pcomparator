"use client";

import { t } from "@lingui/macro";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { toast } from "react-toastify";
import { updatePhoneNumber } from "~/applications/Profile/Api/updatePhoneNumber";
import useForm from "~/components/Form/useForm";
import { Input } from "~/components/Inputs/Input/Input";

interface SettingsPhoneNumberProps {
  defaultValue?: string;
}

export const SettingsPhoneNumber = ({ defaultValue }: SettingsPhoneNumberProps) => {
  const form = useForm<{ phone: string }>(undefined, { defaultValues: { phone: defaultValue } });
  const { i18n } = useLingui();
  const notify = () =>
    toast(<Trans>Phone number updated</Trans>, {
      type: "success"
    });

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <h4 className="text-xl">
            <Trans>Phone Number</Trans>
          </h4>
        </CardHeader>
        <CardBody className="p-4">
          <form.Form
            methods={form.methods}
            onSubmit={async ({ phone }) => await updatePhoneNumber({ phone })}
          >
            <Input
              labelPlacement="outside"
              placeholder=" "
              defaultValue={defaultValue}
              name="phone"
              description={t(i18n)`Please use 32 characters at maximum.`}
              label={t(i18n)`Please enter your full name, or a display name you are comfortable with.`}
            />
          </form.Form>
        </CardBody>
        <CardFooter className="justify-end border-t border-t-default">
          <Button type="submit" color="primary" onPress={notify}>
            <Trans>Save</Trans>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
