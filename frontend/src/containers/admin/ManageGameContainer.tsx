import toast from "react-hot-toast";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { api } from "utils/api";
import { Game } from "interfaces/Game";
import { Button } from "components/Button";
import { FlexGrid } from "components/FlexGrid";
import { PageTitle } from "components/PageTitle";
import { ModifyGameForm } from "components/admin/ModifyGameForm";

interface ManageGameContainerParams {
  gameId: string;
}

export const ManageGameContainer = () => {
  const history = useHistory();

  const { gameId } = useParams<ManageGameContainerParams>();

  const [game, setGame] = useState<Game>();

  /**
   * Invoked when the submit button is clicked
   */
  const handleFormSubmit = (game: Partial<Game>) => {
    api
      .post(`/admin/game/${gameId}`, { ...game })
      .then(() => {
        toast.success("Game updated successfully!");
      })
      .catch(() => {
        toast.error("An error occurred while attempting to update this game.");
      });
  };

  const handleAddImageClick = () => {
    history.push(`/admin/game/${gameId}/image/new`);
  };

  useEffect(() => {
    api.get<Game>(`/admin/game/${gameId}`).then((response) => {
      setGame(response.data);
    });
  }, [gameId]);

  return (
    <Container className="pt-4">
      <PageTitle title="Game Settings" className="pb-2" />
      <FlexGrid columns={2} gap="2rem">
        <div>
          {game && <ModifyGameForm game={game} onSubmit={handleFormSubmit} />}
        </div>
        <div>
          <StyledContainer>
            <h5>Available Images</h5>
            <Button variant="primary" onClick={handleAddImageClick}>
              Add Image
            </Button>
          </StyledContainer>
          {game?.images?.map((image) => (
            <p>
              <Link to={`/admin/image/${image.id}`}>{image.name}</Link>
            </p>
          ))}
        </div>
      </FlexGrid>
    </Container>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
