import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  cause_id: string;

  @Column({ nullable: true })
  cause_class: string;

  @Column()
  subject_id: string;

  @Column()
  subject_class: string;

  @Index()
  @Column()
  action: string;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'json', nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;
}
