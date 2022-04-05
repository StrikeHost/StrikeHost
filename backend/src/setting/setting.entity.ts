import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Setting extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  value: string;

  @Column({ nullable: true, length: 1000 })
  description: string;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  updated_by: User;

  /**
   * Converts the string value to the typed object
   */
  get primitive(): string | boolean | number {
    if (this.value === 'true') {
      return true;
    } else if (this.value === 'false') {
      return false;
    } else if (this.value === 'null') {
      return null;
    } else if (parseFloat(this.value).toString() == this.value) {
      return parseFloat(this.value);
    } else {
      return this.value;
    }
  }

  get id(): string {
    return this.name;
  }
}
