import { Banner } from '@prisma/client';

export class BannerEntity implements Banner {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  picId: number;
}
