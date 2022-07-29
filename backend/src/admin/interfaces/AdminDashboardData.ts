export interface EntityCount {
  count: number;
  history: number[];
}

export interface AdminDashboardData {
  instances: EntityCount;
  users: EntityCount;
  agents: EntityCount;
  images: EntityCount;
}
