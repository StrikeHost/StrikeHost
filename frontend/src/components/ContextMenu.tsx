import { useEffect } from "react";
import styled from "styled-components";

export interface ContextMenuProps {
  x: number;
  y: number;
  isOpen?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const ContextMenu = ({
  x,
  y,
  children,
  isOpen,
  onClose,
}: ContextMenuProps) => {
  /**
   * Invoked on click anywhere within the DOM
   */
  const handleDocumentClick = () => {
    console.log("called");
    console.log(isOpen);

    if (isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", () => handleDocumentClick());

    return () => {
      document.removeEventListener("click", () => handleDocumentClick());
    };
  }, []);

  return (
    <StyledContainer top={y} left={x} open={isOpen}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{
  top: number;
  left: number;
  open?: boolean;
}>`
  z-index: 9999;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  display: ${(props) => (props.open ? "" : "none")};
`;
