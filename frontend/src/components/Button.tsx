import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "success" | "danger";
}

export const Button = ({
  children,
  variant = "primary",
  ...props
}: ButtonProps) => {
  switch (variant) {
    case "primary":
      return <StyledPrimaryButton {...props}>{children}</StyledPrimaryButton>;
    case "success":
      return <StyledSuccessButton {...props}>{children}</StyledSuccessButton>;
    case "danger":
      return <StyledDangerButton {...props}>{children}</StyledDangerButton>;
  }
};

const StyledButton = styled.div`
  color: #fff;
  cursor: pointer;
  width: fit-content;
  border-radius: 4px;
  height: fit-content;
  padding: 0.4rem 0.6rem;

  &:hover {
    color: #fff;
    filter: brightness(85%);
  }
`;

const StyledPrimaryButton = styled(StyledButton)`
  background-color: var(--primary);
`;

const StyledSuccessButton = styled(StyledButton)`
  background-color: var(--success);
`;

const StyledDangerButton = styled(StyledButton)`
  background-color: var(--danger);
`;
