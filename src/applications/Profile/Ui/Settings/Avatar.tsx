"use client";

import { Trans } from "@lingui/macro";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateAvatar } from "~/applications/Profile/Api/updateAvatar";
import useForm from "~/components/Form/useForm";

interface SettingsAvatarProps {
  defaultValue: string;
}

export const SettingsAvatar = ({ defaultValue }: SettingsAvatarProps) => {
  const [avatar, setAvatar] = useState<string>(defaultValue);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const notify = () =>
    toast(<Trans>Avatar updated</Trans>, {
      type: "success"
    });

  const form = useForm();

  return (
    <Card>
      <CardHeader className="p-4">
        <h4 className="text-xl">
          <Trans>Avatar</Trans>
        </h4>
      </CardHeader>
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
          <label htmlFor="avatar">
            <Avatar src={avatar} className="w-20 h-20 text-large cursor-pointer" color="primary" />
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept=".png,.jpg,.webp"
            ref={inputFileRef}
            onChange={async () => {
              if (!inputFileRef.current?.files) throw new Error("No file selected");

              const file = inputFileRef.current.files[0];

              setAvatar(await updateAvatar({ avatar: file }));
              notify();
            }}
            hidden
          />
        </div>
      </CardBody>
      <CardFooter className="border-t border-t-default px-4 py-4">
        <span className="text-small">
          <Trans>An avatar is optional but strongly recommended.</Trans>
        </span>
      </CardFooter>
    </Card>
  );
};
