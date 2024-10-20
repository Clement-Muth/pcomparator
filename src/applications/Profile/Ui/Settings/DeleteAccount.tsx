import { Trans } from "@lingui/macro";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export const SettingsDeleteAccount = () => {
  return (
    <Card classNames={{ base: "border border-danger" }}>
      <CardHeader>
        <h4 className="text-xl">
          <Trans>Delete Account</Trans>
        </h4>
      </CardHeader>
      <CardBody>
        <Trans>
          <p>
            Permanently remove your Personal Account and all of its contents from the PComparator platform.
            This action is not reversible, so please continue with caution.
          </p>
        </Trans>
      </CardBody>
      <CardFooter className="bg-danger/20 justify-end">
        <Button color="danger">
          <Trans>Delete Personal Account</Trans>
        </Button>
      </CardFooter>
    </Card>
  );
};
