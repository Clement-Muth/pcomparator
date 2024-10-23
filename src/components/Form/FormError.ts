import type { Path } from "react-hook-form";

class FormError<R, F> {
  constructor(
    public readonly reason: Path<R>,
    public readonly name: F,
    public readonly message: string
  ) {
    Object.freeze(this);
  }
}

export default FormError;
