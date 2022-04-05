import styled from "styled-components";
import { Link } from "react-router-dom";

export interface DashboardItemPreviewProps {
  link: string;
  text: string;
  title: string;
}

export const DashboardItemPreview = ({
  link,
  text,
  title,
}: DashboardItemPreviewProps) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledButton as={Link} to={link}>
        {text}
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  padding: 1rem 2rem;
  align-items: center;
  background-color: #374151;
  justify-content: space-between;
`;

const StyledTitle = styled.h4`
  margin: 0;
  color: #fff;
  font-size: 16px;
`;

const StyledButton = styled.div`
  color: #fff;
  text-decoration: none;
  border-radius: 0.25rem;
  background-color: #0d6efd;
  padding: 0.375rem 0.75rem;

  &:hover,
  &:active {
    color: #fff;
    background-color: #0b5ed7;
  }
`;
