import { Instance, InstanceStatusType } from "interfaces/Instance";
import styled from "styled-components";

export interface InstanceStatusIndicatorProps {
  instance: Instance;
}

export const InstanceStatusIndicator = ({
  instance,
}: InstanceStatusIndicatorProps) => {
  /**
   * Translates a status to a color for the indicator
   *
   * @param {InstanceStatusType} status
   * @returns {string}
   */
  const formIndicatorColor = (status: InstanceStatusType): string => {
    switch (status) {
      case InstanceStatusType.PROVISIONING:
        return "#FFFF00";
      case InstanceStatusType.RUNNING:
        return "green";
      case InstanceStatusType.STARTING:
        return "#FFFF00";
      case InstanceStatusType.STOPPED:
        return "red";
      case InstanceStatusType.STOPPING:
        return "#FFFF00";
    }
  };

  return (
    <StyledContainer>
      <StyledIndicator color={formIndicatorColor(instance.status)} />
      <StyledTitle>{instance.status.toLowerCase()}</StyledTitle>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--text-secondary);
`;

const StyledIndicator = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: capitalize;
`;
