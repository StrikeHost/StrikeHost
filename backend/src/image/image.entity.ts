import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Game } from 'src/game/game.entity';
import { ImageVersion } from 'src/image-version/image-version.entity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.images)
  game: Game;

  @OneToMany(() => ImageVersion, (version) => version.image)
  versions: ImageVersion[];

  @Column()
  name: string;

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

  @Column()
  docker_name: string;

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
