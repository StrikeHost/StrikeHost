import React from "react";
import styled from "styled-components";

export interface ModalProps {
  isShown?: boolean;
  className?: string;
  onClose?: () => void;
  children: JSX.Element | JSX.Element[];
}

export const Modal = ({
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
      <StyledModal className={className}>{children}</StyledModal>
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
