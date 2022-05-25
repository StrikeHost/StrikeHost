import styled from "styled-components";

export interface SeparatorProps {
  children: string;
}

export const Separator = ({ children }: SeparatorProps) => {
  return (
    <StyledContainer>
      <StyledSeparator />
      <StyledText>{children}</StyledText>
      <StyledSeparator />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin: 1.5rem 0;
  align-items: center;
  justify-content: space-between;
`;

const StyledSeparator = styled.div`
  flex: 1;
  border-bottom: 1px solid #ccc;
`;

const StyledText = styled.div`
  margin: 0;
  font-weight: 500;
`;
