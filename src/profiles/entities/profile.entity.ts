import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  picId: number;
}
