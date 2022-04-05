import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export interface HoverWarningProps {
  text: string;
}

export const HoverWarning = ({ text }: HoverWarningProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <StyledIcon icon={faExclamationCircle} />
      <StyledWarningText isShown={isOpen}>{text}</StyledWarningText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0;
  font-size: 1.2rem;
  color: var(--warning);
`;

const StyledWarningText = styled.div<{ isShown: boolean }>`
  top: 18px;
  left: 18px;
  z-index: 99;
  width: 20rem;
  padding: 0.5rem;
  cursor: default;
  user-select: none;
  position: absolute;
  border-radius: 5px;
  background-color: var(--bg-tertiary);
  display: ${(props) => (props.isShown ? "" : "none")};
`;
