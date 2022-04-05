import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { api } from "utils/api";
import { ImageVersion } from "interfaces/Game";
import { FlexGrid } from "components/FlexGrid";
import { PageTitle } from "components/PageTitle";
import { ModifyVersionForm } from "components/admin/ModifyVersionForm";
import toast from "react-hot-toast";

interface CreateVersionContainerParams {
  imageId: string;
}

export const CreateVersionContainer = () => {
  const history = useHistory();

  const { imageId } = useParams<CreateVersionContainerParams>();

  /**
   * Invoked on form submit
   *
   * @param version
   */
  const handleSubmit = (version: Partial<ImageVersion>) => {
    const request = {
      ...version,
      imageId,
    };

    api.post(`/admin/image/${imageId}/version`, request).then(() => {
      toast.success("Version created successfully!");
      history.push(`/admin/image/${imageId}`);
    });
  };

  return (
    <Container className="pt-4">
      <PageTitle title="Add New Version" className="pb-2" />
      <FlexGrid columns={2} gap="2rem">
        <div>
          <ModifyVersionForm onSubmit={handleSubmit} />
        </div>
      </FlexGrid>
    </Container>
  );
};
