import styled from "styled-components";

export interface CodeProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

export const Code = ({ children, className }: CodeProps) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 7px;
  word-wrap: break-word;
  font-family: monospace;
  background-color: var(--bg-tertiary);
`;
