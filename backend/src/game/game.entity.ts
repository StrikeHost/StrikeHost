import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Image } from 'src/image/image.entity';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Image, (image) => image.game)
  images: Image[];

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
  arguments?: Record<string, string>;

  @Column({ nullable: true })
  docker_name?: string;

  @Column({ nullable: true })
  min_memory?: number;

  @Column({ nullable: true })
  min_storage?: number;

  @Column({ nullable: true })
  min_cpu?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
