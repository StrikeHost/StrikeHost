import styled from "styled-components";
import { Container } from "react-bootstrap";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ModalProps {
  title?: string;
  isShown?: boolean;
  onClose?: () => void;
  children: JSX.Element | JSX.Element[];
}

export const Modal = ({ title, children, onClose, isShown }: ModalProps) => {
  return (
    <StyledWrapper isShown={isShown}>
      <Container>
        <StyledContainer>
          <StyledTitleContainer>
            <div>
              {title && (
                <>
                  <h3>{title}</h3>
                </>
              )}
            </div>
            <StyledIcon onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </StyledIcon>
          </StyledTitleContainer>
          {title && <hr />}
          {children}
        </StyledContainer>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ isShown?: boolean }>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.64);
  display: ${(props) => (props.isShown ? "flex" : "none")};
`;

const StyledContainer = styled.div`
  width: 60%;
  margin: auto;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--bg-secondary);
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

const StyledIcon = styled.span`
  cursor: pointer;
`;
