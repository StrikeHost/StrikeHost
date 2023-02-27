import { Instance } from 'src/instance/instance.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ResourceAllocation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpus: number;

  @Column()
  memory: number;

  @Column()
  storage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Instance)
  @JoinColumn()
  instance: Instance;

  @ManyToOne(() => User, (user) => user.resource_allocations, {
    nullable: false,
  })
  user: User;
}
