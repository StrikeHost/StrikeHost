import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageNotFoundContainer = () => {
  return (
    <StyledContainer>
      <div>
        <h3 className="">Whoops!</h3>
        <p>
          We couldn't find that page, try returning to the{" "}
          <Link to="/">dashboard</Link>.
        </p>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -100;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: center;
  justify-content: center;

  & > * {
    text-align: center;
  }
`;
