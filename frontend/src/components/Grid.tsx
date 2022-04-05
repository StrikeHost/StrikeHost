import styled from "styled-components";

export interface GridProps {
  gap?: string;
  columns: number;
  className?: string;
  children?: React.ReactNode;
}

export const Grid = ({ gap, columns, className, children }: GridProps) => {
  return (
    <StyledContainer gap={gap} columns={columns} className={className}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ gap?: string; columns: number }>`
  display: grid;
  gap: ${(props) => (props.gap ? props.gap : "")};
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
`;
