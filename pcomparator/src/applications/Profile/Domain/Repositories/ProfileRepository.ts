import type { Profile, ProfileUpdate } from "pcomparator/src/applications/Profile/Domain/Entities/Profile";

export interface ProfileRepository {
  update(user: ProfileUpdate): Promise<Profile>;

  findById(id: string): Promise<Profile | null>;
}
