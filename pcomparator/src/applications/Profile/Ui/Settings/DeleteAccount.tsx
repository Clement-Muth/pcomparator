"use client";

import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteAccount } from "pcomparator/src/applications/Profile/Api/deleteAccount";
import useForm from "pcomparator/src/components/Form/useForm";
import { Input } from "pcomparator/src/components/Inputs/Input/Input";
import useDevice from "pcomparator/src/hooks/useDevice";

export const SettingsDeleteAccount = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { i18n } = useLingui();
  const device = useDevice();
  const form = useForm<{ confirm: string }>("confirm");
  const notify = () =>
    toast(<Trans>Account deleted</Trans>, {
      type: "success"
    });
  const { replace } = useRouter();

  return (
    <>
      <Card classNames={{ base: "border border-danger" }}>
        <CardHeader className="p-4">
          <h4 className="text-xl">
            <Trans>Delete Account</Trans>
          </h4>
        </CardHeader>
        <CardBody className="p-4">
          <Trans>
            <p className="text-small md:text-base">
              Permanently remove your Personal Account and all of its contents from the PComparator platform.
              This action is not reversible, so please continue with caution.
            </p>
          </Trans>
        </CardBody>
        <CardFooter className="bg-danger/20 justify-end">
          <Button color="danger" onPress={onOpen} fullWidth={device === "mobile"}>
            <Trans>Delete Personal Account</Trans>
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <p>
              <Trans>Delete Personal Account</Trans>
            </p>
          </ModalHeader>
          <ModalBody>
            <form.Form
              methods={form.methods}
              onSubmit={async () => {
                await deleteAccount();
                notify();
                replace("/");
              }}
              actions={{
                nextProps: {
                  title: <Trans>I understand, delete my account</Trans>,
                  fullWidth: true,
                  color: "danger",
                  isDisabled: !form.watch("confirm")?.match(t(i18n)`delete my account`)
                },
                wrapper: ModalFooter,
                wrapperProps: { className: "justify-end border-t border-t-default -px-4" }
              }}
            >
              <Input
                className="mt-8 md:mt-0"
                label={
                  <span>
                    <Trans>
                      <b>To verify, type</b> <i>delete my account</i>
                      <b> below:</b>
                    </Trans>
                  </span>
                }
                name="confirm"
                placeholder={t(i18n)`delete my account`}
                autoComplete="off"
              />
            </form.Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
