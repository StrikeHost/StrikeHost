export interface Instance {
  readonly id: string;
  port: number;
  status: InstanceStatusType;
  memory: number;
  storage: number;
  image: Image;
  version: ImageVersion;
}

export interface Image {
  id: string;
  docker_name: string;
}

export interface ImageVersion {
  id: string;
  name: string;
  arguments: Record<string, string>;
}

export enum InstanceStatusType {
  STOPPED = "STOPPED",
  STARTING = "STARTING",
  RUNNING = "RUNNING",
  STOPPING = "STOPPING",
  PROVISIONING = "PROVISIONING",
}
