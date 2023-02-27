export interface PaginatedResponse<T> {
  results: T[];
  count: number;
}
