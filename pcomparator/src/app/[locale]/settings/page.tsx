import { Trans } from "@lingui/macro";
import { SettingsAvatar } from "pcomparator/src/applications/Profile/Ui/Settings/Avatar";
import { SettingsDeleteAccount } from "pcomparator/src/applications/Profile/Ui/Settings/DeleteAccount";
import { SettingsDisplayName } from "pcomparator/src/applications/Profile/Ui/Settings/DisplayName";
import { SettingsPhoneNumber } from "pcomparator/src/applications/Profile/Ui/Settings/PhoneNumber";
import { withLinguiPage } from "pcomparator/src/core/withLinguiLayout";
import { auth } from "pcomparator/src/libraries/nextauth/authConfig";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <main className="flex w-full justify-center p-4 md:mt-8">
      <div className="flex flex-col gap-y-8 max-w-4xl w-[inherit]">
        <h1 className="text-xl md:text-4xl">
          <Trans>Account Settings</Trans>
        </h1>
        <SettingsAvatar defaultValue={session?.user?.image!} />
        <SettingsDisplayName defaultValue={session?.user?.name!} />
        <SettingsPhoneNumber defaultValue={session?.user?.phone} />
        <SettingsDeleteAccount />
      </div>
    </main>
  );
};

export default withLinguiPage(SettingsPage);
