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
import useForm from "~/components/Form/useForm";
import { Input } from "~/components/Inputs/Input/Input";

export const SettingsDeleteAccount = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { i18n } = useLingui();
  const form = useForm<{ confirm: string }>("confirm");

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
            <p>
              Permanently remove your Personal Account and all of its contents from the PComparator platform.
              This action is not reversible, so please continue with caution.
            </p>
          </Trans>
        </CardBody>
        <CardFooter className="bg-danger/20 justify-end">
          <Button color="danger" onPress={onOpen}>
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
              onSubmit={() => {}}
              actions={{
                nextProps: {
                  title: <Trans>I understand, delete my account</Trans>,
                  fullWidth: true,
                  color: "danger",
                  isDisabled: !form.watch("confirm")?.match("delete my account")
                },
                wrapper: ModalFooter,
                wrapperProps: { className: "justify-end border-t border-t-default -px-4" }
              }}
            >
              <Input
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
              />
            </form.Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
