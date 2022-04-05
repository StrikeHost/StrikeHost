import { useHistory } from "react-router";
import styled from "styled-components";
import { Button } from "./Button";
import { HoverWarning } from "./HoverWarning";

export interface PageTitleProps {
  title: string;
  href?: string;
  action?: string;
  warning?: string;
  className?: string;
  onClick?: () => void;
}

export const PageTitle = ({
  title,
  href,
  action,
  onClick,
  warning,
  className,
}: PageTitleProps) => {
  const history = useHistory();

  /**
   * Invoked when the button is clicked
   */
  const handleClick = () => {
    if (href) {
      history.push(href);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={className}>
      <StyledTitleBar>
        <h4>{title}</h4>

        <StyledSecondaryContainer>
          {warning && <HoverWarning text={warning} />}
          {((href && action) || (onClick && action)) && (
            <Button onClick={handleClick}>{action}</Button>
          )}
        </StyledSecondaryContainer>
      </StyledTitleBar>
      <hr />
    </div>
  );
};

const StyledTitleBar = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const StyledSecondaryContainer = styled.div`
  gap: 0.8rem;
  display: flex;
  align-items: center;
`;
