import { ImageVersion } from 'src/image-version/image-version.entity';
import { User } from 'src/user/user.entity';
import { Image } from 'src/image/image.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agent } from 'src/agent/agent.entity';
import { ResourceAllocation } from 'src/resource-allocation/resource-allocation.entity';

@Entity()
export class Instance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  port: number;

  @Column()
  status: string;

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

  @Column({ nullable: true })
  last_started_at?: Date;

  @Column({ nullable: true })
  last_stopped_at?: Date;

  @ManyToOne(() => User, (user) => user.instances)
  user: User;

  @ManyToOne(() => Agent, (agent) => agent.instances)
  agent: Agent;

  @ManyToOne(() => Image)
  image: Image;

  @ManyToOne(() => ImageVersion)
  version: ImageVersion;

  @OneToOne(() => ResourceAllocation, {
    nullable: false,
  })
  resource_allocation: ResourceAllocation;
}
