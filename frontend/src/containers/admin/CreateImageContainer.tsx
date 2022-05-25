import toast from "react-hot-toast";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { api } from "utils/api";
import { Game, Image } from "interfaces/Game";
import { PageTitle } from "components/PageTitle";
import { ModifyImageForm } from "components/admin/ModifyImageForm";
import { useEffect, useState } from "react";

interface CreateImageContainerParams {
  gameId: string;
}

export const CreateImageContainer = () => {
  const history = useHistory();
  const { gameId } = useParams<CreateImageContainerParams>();
  const [game, setGame] = useState<Game>();

  const handleSubmit = (img: Partial<Image>) => {
    api.post<Image>(`/admin/game/${gameId}/image`, { ...img }).then(() => {
      toast.success("Image created successfully!");
      history.push(`/admin/game/${gameId}`);
    });
  };

  useEffect(() => {
    api
      .get<Game>(`/admin/game/${gameId}`)
      .then((response) => setGame(response.data));
  }, []);

  return (
    <Container>
      <PageTitle className="pt-4" title="Add New Image" />
      {game && <ModifyImageForm onSubmit={handleSubmit} game={game} />}
    </Container>
  );
};
