import { User } from "interfaces/User";
import { Panel } from "components/Panel";

export interface UserResourcesPanelProps {
  user: User;
}

export const UserResourcesPanel = () => {
  return <Panel span={6} title="Resource Allocations"></Panel>;
};
