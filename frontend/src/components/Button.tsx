import React from "react";
import styled from "styled-components";

export interface ButtonProps {
  fill?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  variant?: "primary" | "success" | "danger";
}

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) => {
  switch (variant) {
    case "primary":
      return (
        <StyledPrimaryButton size={size} {...props}>
          {children}
        </StyledPrimaryButton>
      );
    case "success":
      return (
        <StyledSuccessButton size={size} {...props}>
          {children}
        </StyledSuccessButton>
      );
    case "danger":
      return (
        <StyledDangerButton size={size} {...props}>
          {children}
        </StyledDangerButton>
      );
  }
};

const StyledButton = styled.button<{
  fill?: boolean;
  size: "sm" | "md" | "lg";
}>`
  all: unset;

  color: #fff;
  border: none;
  cursor: pointer;
  ${(props) => props.size === "sm" && "font-size: 0.8rem; padding: 4px 8px;"}
  ${(props) => props.size === "md" && "font-size: 1rem; padding: 8px 16px;"}
  ${(props) => props.size === "lg" && "font-size: 1.2rem; padding: 12px 24px;"}
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
