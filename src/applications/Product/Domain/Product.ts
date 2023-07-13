export class Product {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number
  ) {
    Object.freeze(this);
  }
}
