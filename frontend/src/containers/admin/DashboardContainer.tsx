/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { api } from "utils/api";
import { BreadcrumbTrail } from "components/Breadcrumbs";
import { GridGraphBox } from "components/dashboard/GridGraphBox";
import { GridActionBox } from "components/dashboard/GridActionBox";
import { ActionsTablePanel } from "components/dashboard/ActionsTablePanel";

export const AdminBreadcrumbs: BreadcrumbTrail[] = [
  {
    link: "/admin",
    text: "Dashboard",
  },
];

export const DashboardContainer = () => {
  const [instanceCount, setInstanceCount] = useState<number>(0);
  const [imageCount, setImageCount] = useState<number>(0);
  const [agentCount, setAgentCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    api.get<Record<string, number>>("/admin/dashboard").then((res) => {
      setInstanceCount(res.data.instanceCount);
      setImageCount(res.data.imageCount);
      setAgentCount(res.data.agentCount);
      setUserCount(res.data.userCount);
    });
  }, []);

  return (
    <Container className="pt-4">
      <StyledGrid>
        <GridActionBox
          value={instanceCount}
          subText="Instances"
          history={[100, 120]}
        />
        <GridActionBox value={userCount} subText="Users" history={[100, 120]} />
        <GridActionBox
          value={agentCount}
          subText="Agents"
          history={[100, 120]}
        />
        <GridActionBox
          value={imageCount}
          subText="Images"
          history={[100, 120]}
        />
        <GridGraphBox span={2} history={[100, 120]} title="Test" />
        <GridGraphBox span={2} history={[100, 120]} title="Test" />
        <GridActionBox actionText="Create" value="Agent" />
        <GridActionBox actionText="Create" value="User" />
        <GridActionBox actionText="Update all" value="Agents" />
        <GridActionBox actionText="Register" value="Game" />
        <ActionsTablePanel />
      </StyledGrid>
    </Container>
  );
};

const StyledGrid = styled.div`
  gap: 1rem;
  display: grid;
  max-width: 100%;
  overflow-x: auto;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;
