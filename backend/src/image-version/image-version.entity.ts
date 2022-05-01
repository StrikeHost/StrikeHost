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
    type: 'varchar',
    nullable: true,
    transformer: {
      from(val: string) {
        return JSON.parse(val) as Record<string, string>;
      },
      to(val: object) {
        return JSON.stringify(val);
      },
    },
  })
  arguments: Record<string, string>;
}
