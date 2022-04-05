import { api } from "utils/api";
import { ImageVersion } from "interfaces/Game";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { PageTitle } from "components/PageTitle";
import { FlexGrid } from "components/FlexGrid";
import { ModifyVersionForm } from "components/admin/ModifyVersionForm";

interface ManageVersionContainerParams {
  imageId: string;
  versionId: string;
}

export const ManageVersionContainer = () => {
  const history = useHistory();

  const { imageId, versionId } = useParams<ManageVersionContainerParams>();

  const [version, setVersion] = useState<ImageVersion>();

  /**
   * Invoked on form submit
   *
   * @param version
   */
  const onSubmit = (version: Partial<ImageVersion>) => {
    api
      .post(`/admin/image/${imageId}/version/${versionId}`, { ...version })
      .then(() => {
        history.push(`/admin/image/${imageId}`);
      });
  };

  useEffect(() => {
    api
      .get<ImageVersion>(`/admin/image/${imageId}/version/${versionId}`)
      .then((response) => {
        setVersion(response.data);
      });
  }, []);

  return version ? (
    <Container className="pt-4">
      <PageTitle title="Image Version Settings" className="pb-2" />
      <FlexGrid columns={2} gap="2rem">
        <ModifyVersionForm version={version} onSubmit={onSubmit} />
      </FlexGrid>
    </Container>
  ) : (
    <></>
  );
};
