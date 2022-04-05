import styled from "styled-components";

export interface InstancePreviewInfoBoxProps {
  name: string;
  content: string | number;
}

export const InstancePreviewInfoBox = ({
  name,
  content,
}: InstancePreviewInfoBoxProps) => (
  <StyledDiv>
    <StyledTitle>{name}</StyledTitle>
    <StyledSubtitle>{content}</StyledSubtitle>
  </StyledDiv>
);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  flex: 1;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
`;

const StyledSubtitle = styled.div`
  flex: 1;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-secondary);
`;
