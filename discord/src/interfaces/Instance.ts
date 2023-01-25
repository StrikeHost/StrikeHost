export interface Instance {
  readonly id: string;
  port: number;
  status: InstanceStatusType;
  detailed_status?: DetailedStatus;
  cpus: number;
  memory: number;
  storage: number;
  image: Image;
  user?: User;
  version: ImageVersion;
  agent: Agent;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  discord_id?: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
  instances: Instance[];
}

export interface DetailedStatus {
  max_players?: number;
  player_count?: number;
  player_list?: string[];
  status: InstanceStatusType;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  images: Image[];
  min_memory?: number;
  min_storage?: number;
  min_cpu?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Image {
  id: string;
  docker_name: string;
  game: Game;
  name: string;
}

export interface Agent {
  id: string;
  ip: string;
  status: string;
  cores: number;
  memory: number;
  storage: number;
  instances: Instance[];
}

export interface ImageVersion {
  id: string;
  name: string;
  arguments: Record<string, string>;
}

export interface InheritableInstance {
  arguments: Record<string, string>;
  docker_name: string;
  min_memory: number;
  min_storage: number;
  min_cpu: number;
}

export interface SerializedInstance {
  instance: Instance;
  inheritableInstance: InheritableInstance;
}

export enum InstanceStatusType {
  STOPPED = "STOPPED",
  STARTING = "STARTING",
  RUNNING = "RUNNING",
  STOPPING = "STOPPING",
  PROVISIONING = "PROVISIONING",
}
