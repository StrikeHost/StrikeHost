import { Image, ImageVersion } from "./Game";
import { User } from "./User";

export interface Instance {
  id: string;
  ip: string;
  user?: User;
  cpu?: number;
  agent: Agent;
  port: number;
  image?: Image;
  memory: number;
  storage: number;
  user_id: string;
  pack_id: string;
  created_at: Date;
  updated_at: Date;
  server_id: string;
  version?: ImageVersion;
  status: InstanceStatusType;
}

export interface Agent {
  id: string;
  ip: string;
  cores: number;
  memory: number;
  created_at: Date;
  updated_at: Date;
  secrets: AgentSecret[];
}

export interface AgentSecret {
  id: number;
  agent?: Agent;
  created_at: Date;
  updated_at: Date;
  disabled_at: Date;
  created_by: User;
}

export enum InstanceStatusType {
  RUNNING = "RUNNING",
  STOPPED = "STOPPED",
  STARTING = "STARTING",
  STOPPING = "STOPPING",
  PROVISIONING = "PROVISIONING",
}
