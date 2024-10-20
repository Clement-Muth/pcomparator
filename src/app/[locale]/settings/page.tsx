import { Trans } from "@lingui/macro";
import { SettingsAvatar } from "~/applications/Profile/Ui/Settings/Avatar";
import { SettingsDeleteAccount } from "~/applications/Profile/Ui/Settings/DeleteAccount";
import { SettingsDisplayName } from "~/applications/Profile/Ui/Settings/DisplayName";
import { SettingsPhoneNumber } from "~/applications/Profile/Ui/Settings/PhoneNumber";
import { withLinguiPage } from "~/core/withLinguiLayout";

const SettingsPage = () => {
  return (
    <main className="flex w-full justify-center p-4 mt-8">
      <div className="flex flex-col gap-y-8 max-w-4xl">
        <h1 className="text-4xl">
          <Trans>Account Settings</Trans>
        </h1>
        <SettingsAvatar />
        <SettingsDisplayName />
        <SettingsPhoneNumber />
        <SettingsDeleteAccount />
      </div>
    </main>
  );
};

export default withLinguiPage(SettingsPage);
