import { Session } from "next-auth";

type UserProfile = {
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
};

export class User {
  public readonly user: UserProfile | undefined;

  constructor(user: Session["user"]) {
    this.user = user;
  }

  get exist(): boolean {
    return !!this.user ?? false;
  }
}
