import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
}
