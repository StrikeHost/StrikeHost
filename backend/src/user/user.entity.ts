import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { Instance } from 'src/instance/instance.entity';
import { ResourceAllocation } from 'src/resource-allocation/resource-allocation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: false })
  admin: boolean;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, genSaltSync(10));
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Instance, (instance) => instance.user)
  instances: Instance[];

  @OneToMany(() => ResourceAllocation, (resource) => resource.user)
  resource_allocations: ResourceAllocation[];

  /**
   * Compare the given password with the user's password.
   *
   * @param {string} password
   * @returns {boolean}
   */
  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}
