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
}

export interface ResourceAllocation {
  id: string;
  user: User;
  memory: number;
  storage: number;
  created_at: Date;
  updated_at: Date;
  instance?: Instance;
}
