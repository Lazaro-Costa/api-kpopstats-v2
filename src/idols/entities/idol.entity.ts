import { Idol } from '@prisma/client';

export class IdolEntity implements Idol {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  korean_name: string;
  foreign_name: string;
  nationality: string;
  date_birth: Date;
  solist: boolean;
  more_info: string;
  companyId: number;
  groupId: number;
  picsId: number;
}
