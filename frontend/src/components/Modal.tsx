import React from "react";
import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import { SecondaryText } from "./text/SecondaryText";

export interface ModalProps {
  title?: string;
  isShown?: boolean;
  className?: string;
  onClose?: () => void;
  children: JSX.Element | JSX.Element[];
}

export const Modal = ({
  title,
  onClose,
  children,
  isShown,
  className,
}: ModalProps) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <StyledWrapper isShown={isShown} onClick={handleClick}>
      <StyledModal className={className}>
        {title && (
          <StyledTitleRow>
            <SecondaryText className="mb-2">{title}</SecondaryText>
            {onClose && <CloseButton onClick={onClose} />}
          </StyledTitleRow>
        )}
        {children}
      </StyledModal>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ isShown?: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(30px);

  display: ${(props) => (props.isShown ? "flex" : "none")};
`;

const StyledModal = styled.div`
  width: 500px;
  padding: 1rem;
  cursor: initial;
  background-color: var(--bg-secondary);
`;

const StyledTitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
