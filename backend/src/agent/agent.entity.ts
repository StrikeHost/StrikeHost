import { AgentSecret } from 'src/agent-secret/agent-secret.entity';
import { Instance } from 'src/instance/instance.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const BUFFER_MEMORY = 1024; // 1GB of buffer space between actual cap

@Entity()
export class Agent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column({ nullable: true })
  status: string;

  @Column('int', { nullable: true })
  cores: number;

  @Column('int', { nullable: true })
  allocated_cores: number;

  @Column('int', { nullable: true })
  free_cores: number;

  @Column('int', { nullable: true })
  memory: number;

  @Column('int', { nullable: true })
  allocated_memory: number;

  @Column('int', { nullable: true })
  free_memory: number;

  @Column('int', { nullable: true })
  storage: number;

  @Column('int', { nullable: true })
  free_storage: number;

  @Column('int', { nullable: true })
  allocated_storage: number;

  @Column('text', {
    nullable: true,
    transformer: {
      from(val: string) {
        return JSON.parse(val) as number[];
      },
      to(val: object) {
        return JSON.stringify(val);
      },
    },
  })
  port_numbers: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  heartbeat: Date;

  @Column({ nullable: true })
  last_restarted_at: Date;

  @Column({ nullable: true })
  last_updated_at: Date;

  @Column({ default: false })
  is_operational: boolean;

  @OneToMany(() => Instance, (instance) => instance.agent)
  instances: Instance[];

  @OneToMany(() => AgentSecret, (secret) => secret.agent)
  secrets: AgentSecret[];

  /**
   * Check to see if this agent has enough memory to support this instance
   *
   * @param {Instance} instance
   * @returns {boolean}
   */
  canHostInstance(instance: Instance): boolean {
    return this.free_memory - BUFFER_MEMORY >= instance.memory;
  }

  /**
   * Finds the next available port
   *
   * @returns {number}
   */
  findAvailablePort(): number {
    const ports = this.port_numbers;
    if (ports.length > 0) {
      return ports[0];
    }

    return null;
  }

  /**
   * Frees up a specified port
   *
   * @param {number} port
   */
  freeUpPort(port: number) {
    const ports = this.port_numbers;
    ports.push(port);
    this.port_numbers = ports;
  }

  /**
   * Claims a specified port
   *
   * @param {number} port
   */
  claimPort(port: number) {
    let ports = this.port_numbers;
    if (ports.some((portNum) => portNum === port)) {
      ports = ports.filter((value) => value !== port);
    }

    this.port_numbers = ports;
  }

  /**
   * Attempts to authenticate an agent
   *
   * @param {string} secret
   * @returns {Promise<boolean>}
   */
  async authenticateAgent(secret: string): Promise<boolean> {
    for (let i = 0; i < this.secrets.length; i++) {
      if (await this.secrets[i].compareSecret(secret)) return true;
    }

    return false;
  }
}
