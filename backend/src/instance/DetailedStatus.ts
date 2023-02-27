import { InstanceStatusType } from './enum/InstanceStatusType';

export interface DetailedStatus {
  max_players?: number;
  player_count?: number;
  player_list?: string[];
  status: InstanceStatusType;
}
