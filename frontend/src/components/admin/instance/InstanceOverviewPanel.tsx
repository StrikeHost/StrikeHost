import styled from "styled-components";

import { Grid } from "components/Grid";
import { formatDate } from "utils/misc";
import { Panel } from "components/Panel";
import { Instance, InstanceStatusType } from "interfaces/Instance";
import { Button } from "components/Button";
import { useInstance } from "hooks/useInstance";

export interface InstanceOverviewProps {
  instance: Instance;
}

export const InstanceOverviewPanel = ({ instance }: InstanceOverviewProps) => {
  const { isLoading, startInstance, stopInstance } = useInstance(instance.id);

  return (
    <Panel title="Instance" span={3}>
      <Grid columns={4} gap="1rem" className="p-4">
        <StyledInfoText>
          <p>CPUs</p>
          <p>{instance.cpu || 1}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Memory</p>
          <p>{`${instance.memory}MB`}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Storage</p>
          <p>{`${instance.storage}GB`}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Created</p>
          <p>{`${formatDate(instance.created_at)}`}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Status</p>
          <p>{instance.status}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Agent</p>
          <p>{instance.agent.ip}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Ports</p>
          <p>{instance.port}</p>
        </StyledInfoText>
        <StyledInfoText>
          <p>Image</p>
          <p>{instance.image?.name}</p>
        </StyledInfoText>
      </Grid>
      <StyledActionsContainer className="px-4 pb-4">
        <StyledInnerContainer>
          {instance.status === InstanceStatusType.STOPPED ? (
            <Button
              variant="primary"
              onClick={startInstance}
              disabled={isLoading}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={stopInstance}
              disabled={isLoading}
            >
              Stop
            </Button>
          )}
          <Button variant="primary" disabled>
            Restart
          </Button>
        </StyledInnerContainer>
        <Button variant="danger" disabled>
          Delete
        </Button>
      </StyledActionsContainer>
    </Panel>
  );
};

const StyledInfoText = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;

  & > p {
    margin: 0;
  }

  & > p:nth-child(2) {
    font-weight: 700;
  }
`;

const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInnerContainer = styled.div`
  gap: 0.7rem;
  display: flex;
`;
