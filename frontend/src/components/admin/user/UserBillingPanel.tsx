import { Panel } from "components/Panel";
import { User } from "interfaces/User";

export interface UserBillingPanelProps {
  user: User;
}

export const UserBillingPanel = () => {
  return <Panel span={3} title="Billing"></Panel>;
};
