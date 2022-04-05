import styled from "styled-components";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import { api } from "utils/api";
import { Game } from "interfaces/Game";
import { Table } from "components/Table";
import { useHistory } from "react-router";
import { Button } from "components/Button";
import { PageTitle } from "components/PageTitle";

export const GamesContainer = () => {
  const history = useHistory();
  const [games, setGames] = useState<Game[]>([]);

  /**
   * Renders the buttons for one row in the table
   *
   * @param game
   * @returns
   */
  const renderButtons = (game: Game) => {
    return (
      <div>
        <Button onClick={() => history.push(`/admin/game/${game.id}`)}>
          Manage
        </Button>
      </div>
    );
  };

  /**
   * Renders the content of an expanded row in the table
   *
   * @param {Game} game
   * @returns {React.ReactNode}
   */
  const renderExpandRow = (game: Game) => {
    return (
      <StyledExpandedRow>
        {game.images && (
          <>
            <p>
              <strong>Available images:</strong>
            </p>
            <Table data={game.images} keys={["ID", "Name", "Slug"]} />
          </>
        )}
      </StyledExpandedRow>
    );
  };

  useEffect(() => {
    api.get<Game[]>("/admin/game").then((res) => {
      setGames(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container className="pt-4">
      <PageTitle
        title="Games"
        className="pb-2"
        action="Add New Game"
        href="/admin/game/new"
      />
      {games.length && (
        <Table
          data={games}
          expandRow={renderExpandRow}
          renderButtons={renderButtons}
          keys={["ID", "Name", "Slug"]}
        />
      )}
    </Container>
  );
};

const StyledExpandedRow = styled.div``;
