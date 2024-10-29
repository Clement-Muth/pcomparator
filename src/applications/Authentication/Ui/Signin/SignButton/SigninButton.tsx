"use client";

import { Trans } from "@lingui/macro";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { signin } from "~/applications/Authentication/Api/signin";

export const SigninButton = () => {
  return (
    <form
      action={async () => {
        await signIn("google");
        await signin();
      }}
    >
      <Button color="primary" variant="flat" type="submit">
        <Trans>Signin</Trans>
      </Button>
    </form>
  );
};
