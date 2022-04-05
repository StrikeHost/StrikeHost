import { Container } from "react-bootstrap";

import { InstancesContainer } from "./InstancesContainer";

export const DashboardContainer = () => {
  return (
    <Container className="pt-4">
      <InstancesContainer />
    </Container>
  );
};
