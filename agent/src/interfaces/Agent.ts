export interface Agent {
  id: string;
  ip: string;
  port: number;
  cores: number;
  memory: number;
  created_at: Date;
  storage: number[];
  updated_at: string;
  heartbeat_at?: string;
  status: AgentStatusType;
}

export enum AgentStatusType {
  RUNNING = "RUNNING",
  NOT_SETUP = "NOT_SETUP",
}
