"use client";

import { Trans } from "@lingui/macro";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export const ProfileButton = () => {
  const session = useSession();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          color="primary"
          name={session.data?.user!.name!}
          size="sm"
          src={session.data?.user!.image!}
          isBordered
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="settings" href="/settings">
          Settings
        </DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
          <Trans>Signout</Trans>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
