"use client";

import { t } from "@lingui/macro";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";

export const SettingsPhoneNumber = () => {
  const { i18n } = useLingui();

  return (
    <Card>
      <CardHeader>
        <h4 className="text-xl">
          <Trans>Phone Number</Trans>
        </h4>
      </CardHeader>
      <CardBody>
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
