import { Group } from '@prisma/client';

export class GroupEntity implements Group {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  fandom_name: string;
  debut_date: Date;
  more_info: string;
  companyId: number;
  picsId: number;
}
