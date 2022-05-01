import toast from "react-hot-toast";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { api } from "utils/api";
import { Game, Image } from "interfaces/Game";

export const CreateInstanceContainer = () => {
  const history = useHistory();

  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game>();
  const [image, setImage] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<Image>();
  const [version, setVersion] = useState<string>("");

  /**
   * Invoked on game change
   *
   * @param event
   */
  const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gameId = event.currentTarget.value;
    games.some((game) => {
      if (game.id === gameId) {
        setCurrentGame(game);
        return true;
      }

      return false;
    });
  };

  /**
   * Invoked on image change
   *
   * @param event
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageId = event.currentTarget.value;

    setImage(imageId);

    currentGame?.images?.some((image) => {
      if (image.id === imageId) {
        setCurrentImage(image);
        return true;
      }

      return false;
    });
  };

  /**
   * Invoked on submit button click
   *
   * @param event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const request = {
      game_id: currentGame?.id,
      image_id: image,
      version_id: version,
    };

    api
      .post("instance", request)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    api
      .get<Game[]>("game")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="game">
          <Form.Label>Game</Form.Label>
          <Form.Control as="select" onChange={handleGameChange}>
            <option disabled selected>
              Select game...
            </option>
            {games.map((game, index) => (
              <option value={game.id} key={index}>
                {game.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="pack">
          <Form.Label>Pack</Form.Label>
          <Form.Control
            as="select"
            onChange={handleImageChange}
            disabled={!currentGame}
          >
            <option disabled selected>
              Select pack...
            </option>
            {currentGame &&
              currentGame.images?.map((pack, index) => (
                <option value={pack.id} key={index}>
                  {pack.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="pack">
          <Form.Label>Pack</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) => setVersion(event.currentTarget.value)}
            disabled={!currentImage}
          >
            <option disabled selected>
              Select version...
            </option>
            {currentImage &&
              currentImage?.versions?.map((pack, index) => (
                <option value={pack.id} key={index}>
                  {pack.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
