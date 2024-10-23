"use client";

import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";

export const SettingsDisplayName = () => {
  const { i18n } = useLingui();

  return (
    <Card>
      <CardHeader className="p-4">
        <h4 className="text-xl">
          <Trans>Display Name</Trans>
        </h4>
      </CardHeader>
      <CardBody className="p-4">
        <form>
          <Input
            labelPlacement="outside"
            placeholder=" "
            description={t(i18n)`Please use 32 characters at maximum.`}
            label={t(i18n)`Please enter your full name, or a display name you are comfortable with.`}
          />
        </form>
      </CardBody>
      <CardFooter className="justify-end border-t border-t-default">
        <Button type="submit" color="primary">
          <Trans>Save</Trans>
        </Button>
      </CardFooter>
    </Card>
  );
};
