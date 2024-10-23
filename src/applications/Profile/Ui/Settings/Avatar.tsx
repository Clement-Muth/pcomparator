"use client";

import { Trans } from "@lingui/macro";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import useForm from "~/components/Form/useForm";

export const SettingsAvatar = () => {
  const session = useSession();
  const form = useForm();

  return (
    <Card>
      <CardHeader className="p-4">
        <h4 className="text-xl">
          <Trans>Avatar</Trans>
        </h4>
      </CardHeader>
      <form.Form
        methods={form.methods}
        onSubmit={(data) => console.log(data)}
        actions={{
          nextProps: {
            title: <Trans>Save</Trans>,
            color: "primary"
          },
          wrapper: CardFooter,
          wrapperProps: { className: "justify-end border-t border-t-default" }
        }}
      >
        <CardBody className="p-4">
          <div className="flex w-full justify-between">
            <div>
              <p>
                <Trans>This is your avatar.</Trans>
              </p>
              <p>
                <Trans>Click on the avatar to upload a custom one from your files.</Trans>
              </p>
            </div>
            <Avatar src={session?.data?.user!.image!} size="lg" color="primary" />
          </div>
        </CardBody>
      </form.Form>
      {/* <CardFooter className="justify-end border-t border-t-default">
        
      </CardFooter> */}
    </Card>
  );
};
