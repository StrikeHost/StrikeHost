import styled from "styled-components";

import { Instance } from "interfaces/Instance";
import { GameIcon } from "./GameIcon";
import { InstancePreviewInfoBox } from "./InstancePreviewInfoBox";
import { InstanceStatusIndicator } from "./InstanceStatusIndicator";
import { Button } from "react-bootstrap";
import { useStartInstance } from "hooks/useStartInstance";
import { useStopInstance } from "hooks/useStopInstance";

export interface DetailedInstancePreviewProps {
  instance: Instance;
  className?: string;
}

export const DetailedInstancePreview = ({
  instance,
  className,
}: DetailedInstancePreviewProps) => {
  const { startInstance, isLoading: isStartLoading } = useStartInstance(
    instance.id
  );
  const { stopInstance, isLoading: isStopLoading } = useStopInstance(
    instance.id
  );

  return (
    <StyledExternalContainer className={className}>
      <StyledIcon>
        <GameIcon game={instance.image?.game?.id} />
      </StyledIcon>

      <StyledContentContainer>
        <StyledTopRow>
          <StyledTitle>
            {instance.image?.game?.name} - {instance.image?.name} (
            {instance.version?.name})
          </StyledTitle>
          <InstanceStatusIndicator instance={instance} />
        </StyledTopRow>
        <StyledBottomRow>
          <StyledButtonsContainer>
            <Button onClick={startInstance} disabled={isStartLoading}>
              Start
            </Button>
            <Button onClick={stopInstance} disabled={isStopLoading}>
              Stop
            </Button>
          </StyledButtonsContainer>

          <InstancePreviewInfoBox
            name="Storage"
            content={`${instance.storage}GB`}
          />
          <InstancePreviewInfoBox
            name="Memory"
            content={`${instance.memory}GB`}
          />
          <InstancePreviewInfoBox
            name="CPU"
            content={`${instance.cpu || 0}%`}
          />
          <InstancePreviewInfoBox name="Address" content={instance.agent.ip} />
          <InstancePreviewInfoBox name="Port" content={instance.port} />
        </StyledBottomRow>
      </StyledContentContainer>
    </StyledExternalContainer>
  );
};

const StyledExternalContainer = styled.div`
  gap: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  font-size: 4rem;
  flex-basis: 15%;
`;

const StyledContentContainer = styled.div`
  flex-basis: 85%;
`;

const StyledTopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  flex: 1;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
`;

const StyledBottomRow = styled.div`
  gap: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-self: flex-start;
`;
