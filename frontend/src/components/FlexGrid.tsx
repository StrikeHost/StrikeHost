import styled from "styled-components";

export interface FlexGridProps {
  gap?: string;
  columns: number;
  className?: string;
  children: React.ReactNode;
}

export const FlexGrid = ({
  gap,
  columns,
  children,
  className,
}: FlexGridProps) => {
  return (
    <StyledContainer columns={columns} gap={gap} className={className}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ columns: number; gap?: string }>`
  display: grid;
  gap: ${(props) => (props.gap ? props.gap : "")};
  grid-template-columns: repeat(${(props) => props.columns}, auto);
`;
