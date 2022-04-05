import styled from "styled-components";

import { formatNumber } from "utils/misc";
import { Agent } from "interfaces/Instance";
import { UsageCircle } from "components/data/UsageCircle";

export interface DetailedAgentPreviewProps {
  agent: Agent;
}

export const DetailedAgentPreview = ({ agent }: DetailedAgentPreviewProps) => {
  // We need to subscribe to agent updates via ws when we get here

  return (
    <StyledContainer>
      <h2>{agent.ip}</h2>
      <StyledUsageCollection>
        <UsageCircle upper={100} current={34} title="CPU" />
        <UsageCircle
          upper={agent.memory}
          current={(agent.memory / 4) * 3}
          title="Memory"
          text={`${formatNumber(agent.memory)} MB free`}
        />
        <UsageCircle
          upper={512}
          current={230}
          title="Storage"
          text={`${230} GB / ${512} GB used`}
        />
      </StyledUsageCollection>
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;

const StyledUsageCollection = styled.div`
  display: flex;
  justify-content: flex-end;
`;
