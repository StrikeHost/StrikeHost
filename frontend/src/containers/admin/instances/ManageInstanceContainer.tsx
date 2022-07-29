import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { api } from "utils/api";
import { Grid } from "components/Grid";
import { Panel } from "components/Panel";
import { Instance } from "interfaces/Instance";
import { GridActionBox } from "components/dashboard/GridActionBox";
import { InstanceOverviewPanel } from "components/admin/instance/InstanceOverviewPanel";
import { InstanceFtpPanel } from "components/admin/instance/InstanceFtpPanel";

interface ManageInstanceContainerParams {
  instanceId: string;
}

export const ManageInstanceContainer = () => {
  const { instanceId } = useParams<ManageInstanceContainerParams>();
  const [instance, setInstance] = useState<Instance>();

  useEffect(() => {
    api.get<Instance>(`/admin/instance/${instanceId}`).then((response) => {
      setInstance(response.data);
    });
  }, []);

  return (
    <Container className="pt-3">
      {instance && (
        <>
          <Grid columns={6} gap="1rem">
            <InstanceOverviewPanel instance={instance} />
            <GridActionBox value={`${instance.memory}MB`} subText="Memory" />
            <GridActionBox value={instance.cpu || ""} subText="CPU" />
            <GridActionBox value={`${instance.storage}GB`} subText="Storage" />
            <Panel title="Console" span={3}></Panel>
            <InstanceFtpPanel instance={instance} />
          </Grid>
        </>
      )}
    </Container>
  );
};
