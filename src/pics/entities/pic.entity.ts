import { Pic } from '@prisma/client';
export class PicEntity implements Pic {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
