export class InvalidPayload extends Error {
  constructor(options?: ErrorOptions) {
    super("Oops an error with your payload occured.", options);

    Object.setPrototypeOf(this, InvalidPayload.prototype);
  }
}
