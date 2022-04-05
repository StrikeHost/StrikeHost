import { Container } from "react-bootstrap";

import { api } from "utils/api";
import { Game } from "interfaces/Game";
import { PageTitle } from "components/PageTitle";
import { ModifyGameForm } from "components/admin/ModifyGameForm";
import { useHistory } from "react-router";
import toast from "react-hot-toast";

export const CreateGameContainer = () => {
  const history = useHistory();

  const handleSubmit = (game: Partial<Game>) => {
    api.post("/admin/game", { ...game }).then(() => {
      toast.success("Game created successfully!");
      history.push("/admin/game");
    });
  };

  return (
    <Container>
      <PageTitle className="pt-4" title="Add New Game" />
      <ModifyGameForm onSubmit={handleSubmit} />
    </Container>
  );
};
