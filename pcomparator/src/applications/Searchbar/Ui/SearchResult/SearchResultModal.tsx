import { Trans } from "@lingui/macro";
import {
  Button,
  Card,
  CardBody,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import type { Price } from "~/applications/Prices/Domain/Entities/Price";
import type { Product } from "~/applications/Prices/Domain/Entities/Product";
import type { Store } from "~/applications/Prices/Domain/Entities/Store";
import { getCurrencySymbol } from "~/applications/Prices/Domain/ValueObjects/Currency";

interface SearchResultProps {
  isOpen: boolean;
  onOpenChange: () => void;
  search: string;
  prices: (Price & { product: Product; store: Store })[];
}

export const SearchResultModal = ({ isOpen, onOpenChange, prices, search }: SearchResultProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      <ModalHeader>
        <p>
          <Trans>Prices for {search}</Trans>
        </p>
      </ModalHeader>
      <ModalBody>
        {prices.map((price, i) => (
          <Card key={price.product.name + i}>
            <CardBody className="flex !flex-row gap-4">
              <Image src={price.priceProofImage!} width={100} height={100} className="object-cover" />
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-bold text-lg">{price.product.name}</p>
                  <p className="text-small">{price.store.name} – 6km</p>
                </div>
                <p>
                  {getCurrencySymbol(price.currency)} {price.amount}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button size="sm">
          <Trans>Close</Trans>
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
