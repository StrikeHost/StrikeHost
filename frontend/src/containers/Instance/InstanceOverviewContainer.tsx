import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import { api } from "utils/api";
import { Instance } from "interfaces/Instance";
import { AccessTab } from "components/instance/AccessTab";
import { TabbedContainer } from "components/TabbedContainer";
import { ConsoleTab } from "components/instance/ConsoleTab";
import { DetailsTab } from "components/instance/DetailsTab";
import { DetailedInstancePreview } from "components/DetailedInstancePreview";
import { connect, useDispatch } from "react-redux";
import { addInstance } from "redux/actions/InstancesActions";
import { RootState } from "redux/reducers/RootReducer";
import { UserState } from "redux/reducers/UserReducer";
import { InstancesState } from "redux/reducers/InstancesReducer";

interface InstanceOverviewContainerParams {
  instanceId: string;
}

interface InstanceOverviewContainerProps {
  userState: UserState;
  instancesState: InstancesState;
}

const mapStateToProps = (state: RootState) => ({
  userState: state.userState,
  instancesState: state.instancesState,
});

export const InstanceOverviewContainer = connect(mapStateToProps)(
  ({ instancesState }: InstanceOverviewContainerProps) => {
    const dispatch = useDispatch();

    const { instanceId } = useParams<InstanceOverviewContainerParams>();

    const [instance, setInstance] = useState<Instance>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // TODO: move all this to a custom hook so as not to clutter this file
    const getInstance = () => {
      return (
        instancesState.instances.filter(
          (localInstance) => localInstance.id === instance?.id
        )[0] || instance
      );
    };

    useEffect(() => {
      api.get<Instance>(`/instance/${instanceId}`).then((response) => {
        setInstance(response.data);
        setIsLoading(false);
        dispatch(addInstance(response.data));
      });
    }, [instance?.id, instanceId]);

    return (
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          instance && (
            <>
              <DetailedInstancePreview instance={getInstance()} />
              <TabbedContainer
                id="instance-properties"
                titles={["Server Details", "Console", "SSH & FTP Access"]}
              >
                <DetailsTab />
                <ConsoleTab />
                <AccessTab />
              </TabbedContainer>
            </>
          )
        )}
      </Container>
    );
  }
);
