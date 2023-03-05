import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  return <StyledCloseButton onClick={onClick} icon={faTimes} />;
};

const StyledCloseButton = styled(FontAwesomeIcon)`
  all: unset;
  height: 25px;
  cursor: pointer;
  align-self: flex-start;
`;
