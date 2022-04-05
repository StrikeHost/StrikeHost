import styled from "styled-components";
import { SecondaryText } from "./text/SecondaryText";

export interface PanelProps {
  span?: number;
  className?: string;
  onClick?: () => unknown;
  title: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

export const Panel = ({ title, children, ...props }: PanelProps) => {
  return (
    <StyledContainer {...props} clickable={!!props.onClick}>
      <StyledTitleContainer>
        {typeof title === "string" ? (
          <SecondaryText>{title}</SecondaryText>
        ) : (
          title
        )}
      </StyledTitleContainer>
      {children && <StyledContentContainer>{children}</StyledContentContainer>}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ span?: number; clickable: boolean }>`
  padding: 0.2rem;
  background-color: var(--bg-secondary);
  cursor: ${(props) => (props.clickable ? "pointer" : "")};
  grid-column: ${(props) => (props.span ? `span ${props.span}` : "")};
`;

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0.8rem 0.5rem 0.8rem;
`;

const StyledContentContainer = styled.div`
  background-color: var(--bg-primary);
`;
