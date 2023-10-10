export class Product {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly brand: string,
    public readonly market: string,
    public readonly currency: "eur" | "dol",
    public readonly price: number,
    public readonly location: string,
    public readonly unity: "g" | "ml" | "unity" | "unities-g" | "unities-ml",
    public readonly category: string,
    public readonly quantity: number,
    public readonly image: FileList,
    public readonly weight: number
  ) {
    Object.freeze(this);
  }
}
