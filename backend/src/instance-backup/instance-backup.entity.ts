import { Instance } from 'src/instance/instance.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InstanceBackup extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  backupId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Instance, (instance) => instance.backups)
  instance: Instance;

  @Column()
  size: number;
}
