import styled from "styled-components";

export interface SeparatorProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const Separator = ({ children }: SeparatorProps) => {
  return (
    <StyledContainer>
      <StyledSeparatorComponent />
      <StyledSeparatorText>{children}</StyledSeparatorText>
      <StyledSeparatorComponent />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const StyledSeparatorComponent = styled.div`
  flex: 1;
  border-bottom: 1px solid #a0a0a0;
`;

const StyledSeparatorText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;
