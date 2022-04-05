import styled from "styled-components";
import { useHistory } from "react-router";

import { GameIcon } from "./GameIcon";
import { Instance } from "interfaces/Instance";
import { InstancePreviewInfoBox } from "./InstancePreviewInfoBox";
import { Button } from "react-bootstrap";
import { InstanceStatusIndicator } from "./InstanceStatusIndicator";

export interface InstancePreviewProps {
  instance: Instance;
  className: string;
}

export const InstancePreview = ({
  instance,
  className,
}: InstancePreviewProps) => {
  const history = useHistory();

  return (
    <StyledContainer
      className={className}
      onClick={() => history.push(`/instances/${instance.id}`)}
    >
      <StyledIcon>
        <GameIcon game={instance.image?.game?.slug} />
      </StyledIcon>

      <StyledDetailsContainer>
        <StyledHeader>
          <StyledTitle>Minecraft</StyledTitle>
          <InstanceStatusIndicator instance={instance} />
        </StyledHeader>

        <StyledPropertiesContainer>
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
        </StyledPropertiesContainer>

        <StyledFooter>
          <Button>Stop</Button>
          <Button>View Logs</Button>
        </StyledFooter>
      </StyledDetailsContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  gap: 2rem;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  // border: 1px solid #e4e4e4;
  background: var(--bg-tertiary);

  &:hover {
    filter: brightness(85%);
    // border: 1px solid #dadada;
  }
`;

const StyledIcon = styled.div`
  width: 6rem;
  height: 6rem;
  font-size: 5rem;
  text-align: center;
`;

const StyledDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledTitle = styled.div`
  flex: 1;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
`;

const StyledPropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const StyledFooter = styled.div`
  display: flex;
  gap: 1rem;
`;
