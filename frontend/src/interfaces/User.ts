import { Instance } from "./Instance";

export interface User {
  id: string;
  type: string;
  email: string;
  admin: boolean;
  created_at: Date;
  updated_at: Date;
  last_name: string;
  first_name: string;
  instances: Instance[];
  resource_allocations: ResourceAllocation[];
}

export interface ResourceAllocation {
  id: string;
  user: User;
  cpus: number;
  memory: number;
  storage: number;
  created_at: Date;
  updated_at: Date;
  instance?: Instance;
}
