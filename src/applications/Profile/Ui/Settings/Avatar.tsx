"use client";

import { Trans } from "@lingui/macro";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export const SettingsAvatar = () => {
  const session = useSession();

  return (
    <Card>
      <CardHeader>
        <h4 className="text-xl">
          <Trans>Avatar</Trans>
        </h4>
      </CardHeader>
      <CardBody>
        <form>
          <Avatar src={session?.data?.user!.image!} size="lg" color="primary" />
        </form>
      </CardBody>
      <CardFooter className="justify-end border-t border-t-default">
        <Button type="submit">
          <Trans>Save</Trans>
        </Button>
      </CardFooter>
    </Card>
  );
};
