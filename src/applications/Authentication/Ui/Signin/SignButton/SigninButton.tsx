"use client";

import { Trans } from "@lingui/macro";
import { Button } from "@nextui-org/react";
import { signin } from "~/applications/Authentication/Api/signin";

export const SigninButton = () => (
  <form action={async () => await signin()}>
    <Button color="primary" variant="flat" type="submit">
      <Trans>Signin</Trans>
    </Button>
  </form>
);
