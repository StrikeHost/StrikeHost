export interface Instance {
  readonly id: string;
  port: number;
  status: InstanceStatusType;
  cpus: number;
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
