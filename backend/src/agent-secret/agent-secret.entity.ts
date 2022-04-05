import { hashSync, genSaltSync, compare } from 'bcryptjs';
import { Agent } from 'src/agent/agent.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AgentSecret extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  secret: string;

  @ManyToOne(() => Agent, (agent) => agent.secrets, { onDelete: 'CASCADE' })
  agent: Agent;

  @BeforeInsert()
  hashSecret() {
    this.secret = hashSync(this.secret, genSaltSync(10));
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  disabled_at: Date;

  @ManyToOne(() => User)
  created_by: User;

  /**
   * Compare the given secret with the agent's secret.
   *
   * @param {string} secret
   * @returns {boolean}
   */
  async compareSecret(secret: string) {
    return await compare(secret, this.secret);
  }

  /**
   *
   * @param {string} secret
   * @returns {boolean}
   */
  static async checkSecret(agentId: string, secret: string) {
    const agentSecret = await getRepository(this).findOne({
      agent: { id: agentId },
    });

    if (agentSecret) {
      return agentSecret.compareSecret(secret);
    }

    return false;
  }
}
