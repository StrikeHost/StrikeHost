import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Instance } from "interfaces/Instance";
import { RootState } from "redux/reducers/RootReducer";
import { useInstanceList } from "hooks/useInstanceList";
import { InstancePreview } from "components/InstancePreview";

const mapStateToProps = (state: RootState) => ({
  instances: state.instancesState.instances,
});

export interface InstancesContainerProps {
  instances: Instance[];
}

export const InstancesContainer = connect(mapStateToProps)(() => {
  const { isLoading, instances } = useInstanceList();

  return (
    <>
      <StyledTitleBar>
        <h4>My Servers</h4>

        <Button as={Link} to="/instances/create" variant="primary">
          Register one now
        </Button>
      </StyledTitleBar>
      <hr />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {instances?.length ? (
            <>
              {instances.map((instance, index) => (
                <InstancePreview
                  className="mb-4"
                  instance={instance}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>
              <p>You don't have any servers set up right now.</p>
            </>
          )}
        </>
      )}
    </>
  );
});

const StyledTitleBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`;
