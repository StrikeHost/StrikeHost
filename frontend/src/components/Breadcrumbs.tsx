import React from "react";
import styled from "styled-components";
import { shallowEqual, useSelector } from "react-redux";

import { RootState } from "redux/reducers/RootReducer";
import { Link } from "react-router-dom";

export interface BreadcrumbTrail {
  text: string;
  link: string;
}

export interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const breadcrumbs = useSelector(
    (state: RootState) => state.appState.breadcrumbs,
    shallowEqual
  );
  const showBreadcrumbs = useSelector(
    (state: RootState) => state.appState.showBreadcrumbs,
    shallowEqual
  );

  return showBreadcrumbs ? (
    <StyledContainer className={className}>
      {/* {React.Children.count(children) > 1 ? (
        React.Children.map(children, (child, index) => {
          return (
            <>
              {child}
              {index < React.Children.count(children) - 1 && <p>&gt;</p>}
            </>
          );
        })
      ) : (
        <>{children}</>
      )} */}
      {breadcrumbs.map((crumb, index) => (
        <>
          <Link to={crumb.link}>{crumb.text}</Link>
          {index < breadcrumbs.length - 1 && <p>&gt;</p>}
        </>
      ))}
    </StyledContainer>
  ) : null;
};

const StyledContainer = styled.div`
  gap: 1rem;
  display: flex;
`;
