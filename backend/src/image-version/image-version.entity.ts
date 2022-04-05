import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Image } from 'src/image/image.entity';

@Entity()
export class ImageVersion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Image, (image) => image.versions)
  image: Image;

  /**
   * JSON-formatted string
   */
  @Column({
    nullable: true,
    transformer: {
      from(val: string) {
        return JSON.parse(val);
      },
      to(val: object) {
        return JSON.stringify(val);
      },
    },
  })
  arguments: string;
}
