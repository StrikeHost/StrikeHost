import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  fill?: boolean;
  disabled?: boolean;
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

const StyledButton = styled.button<{ fill?: boolean }>`
  all: unset;

  color: #fff;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 2px;
  text-align: center;
  height: fit-content;
  box-sizing: border-box;
  text-transform: uppercase;
  width: ${(props) => (props.fill ? "100%" : "fit-content")};

  &:hover {
    color: #fff;
    filter: brightness(85%);

    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const StyledPrimaryButton = styled(StyledButton)`
  background-color: var(--accent);
`;

const StyledSuccessButton = styled(StyledButton)`
  background-color: var(--success);
`;

const StyledDangerButton = styled(StyledButton)`
  background-color: var(--danger);
`;
