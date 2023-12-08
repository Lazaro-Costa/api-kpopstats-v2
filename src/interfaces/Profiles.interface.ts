import { PicEntity } from 'src/pics/entities/pic.entity';

export interface GroupWithPictures {
  id: number;
  createdAt: Date;
  name: string;
  picsId: number;
  pictures: PicEntity | PicEntity[];
}
