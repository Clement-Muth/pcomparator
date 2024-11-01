import type { Profile, ProfileUpdate } from "pcomparator/src/applications/Profile/Domain/Entities/Profile";
import type { ProfileRepository } from "pcomparator/src/applications/Profile/Domain/Repositories/ProfileRepository";
import { prisma } from "pcomparator/src/libraries/prisma";

export class PrismaProfileRepository implements ProfileRepository {
  async update(data: ProfileUpdate): Promise<Profile> {
    const updatedProfile = await prisma.user.update({
      data: { phone: data.phone, name: data.name },
      where: { id: data.id }
    });

    return {
      id: updatedProfile.id,
      image: updatedProfile.image!,
      name: updatedProfile.name!,
      phone: updatedProfile.phone
    };
  }

  async findById(id: string): Promise<Profile | null> {
    const profile = await prisma.user.findUnique({ where: { id } });

    return profile
      ? {
          id: profile?.id,
          image: profile?.image!,
          name: profile?.name!,
          phone: profile?.phone
        }
      : null;
  }
}
