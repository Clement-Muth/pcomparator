import { Trans } from "@lingui/macro";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { MapPin } from "lucide-react";
import Link from "~/components/Link/Link";

interface SeeMoreModalProps {
  proof: string;
  name: string;
  price: string;
  location: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const SeeMoreModal = ({ isOpen, onOpenChange, ...price }: SeeMoreModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      <ModalHeader className="flex flex-col gap-y-2">
        <p>{price.name}</p>
        <nav>
          <ul className="flex gap-2">
            <li>
              <Button as={Link} href="#product" variant="flat" size="sm">
                <Trans>Product</Trans>
              </Button>
            </li>
            <li>
              <Button as={Link} href="" variant="flat" size="sm">
                <Trans>Your criteria</Trans>
              </Button>
            </li>
            <li>
              <Button as={Link} href="" variant="flat" size="sm">
                <Trans>Health</Trans>
              </Button>
            </li>
            <li>
              <Button as={Link} href="" variant="flat" size="sm">
                <Trans>Environment</Trans>
              </Button>
            </li>
          </ul>
        </nav>
      </ModalHeader>
      <Divider />
      <ModalBody>
        <Link href="#product">Product</Link>
        <Image
          shadow="sm"
          radius="lg"
          alt={price.proof}
          className="object-cover h-[140px] w-[140px] aspect-square"
          src={price.proof}
        />
        <span>
          <b>{price.name} </b>
          <span className="text-default-500">{price.price}</span>
        </span>
        <span className="text-default-500">
          <MapPin className="inline text-small" /> {price.location}
        </span>
        <Divider />
        <Link href="#product">Your criteria</Link>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);
