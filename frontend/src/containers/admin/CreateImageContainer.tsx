import toast from "react-hot-toast";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { api } from "utils/api";
import { Image } from "interfaces/Game";
import { PageTitle } from "components/PageTitle";
import { ModifyImageForm } from "components/admin/ModifyImageForm";

interface CreateImageContainerParams {
  gameId: string;
}

export const CreateImageContainer = () => {
  const history = useHistory();
  const { gameId } = useParams<CreateImageContainerParams>();

  const handleSubmit = (img: Partial<Image>) => {
    api.post<Image>(`/admin/game/${gameId}/image`, { ...img }).then(() => {
      toast.success("Image created successfully!");
      history.push(`/admin/game/${gameId}`);
    });
  };

  return (
    <Container>
      <PageTitle className="pt-4" title="Add New Image" />
      <ModifyImageForm onSubmit={handleSubmit} />
    </Container>
  );
};
