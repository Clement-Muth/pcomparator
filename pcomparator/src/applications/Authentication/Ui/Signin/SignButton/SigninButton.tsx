"use client";

import { Trans } from "@lingui/macro";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export const SigninButton = () => (
  <form
    action={async () => {
      await signIn("google");
    }}
  >
    <Button color="primary" variant="flat" type="submit">
      <Trans>Signin</Trans>
    </Button>
  </form>
);
