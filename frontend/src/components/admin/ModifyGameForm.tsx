import { Form } from "react-bootstrap";

import { Button } from "components/Button";
import { Game } from "interfaces/Game";
import { useState } from "react";
import slugify from "slugify";
import { InheritableGameComponentsForm } from "./game/InheritableGameComponentsForm";

export interface ModifyGameFormProps {
  game?: Game;
  onSubmit?: (game: Partial<Game>) => void;
}

export const ModifyGameForm = ({ game, onSubmit }: ModifyGameFormProps) => {
  const [name, setName] = useState<string>(game?.name || "");
  const [slug, setSlug] = useState<string>(game?.slug || "");
  const [gameVal, setGameVal] = useState<Game | Record<string, unknown>>(
    game || {}
  );

  /**
   * Invoked on form submit
   */
  const handleFormSubmit = () => {
    const game: Partial<Game> = {
      ...gameVal,
      name,
      slug,
    };

    if (onSubmit) {
      onSubmit(game);
    }
  };

  /**
   * Invoked on name change
   *
   * @param event
   */
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setName(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Game Name</Form.Label>
        <Form.Control type="text" value={name} onChange={handleNameChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Game Slug</Form.Label>
        <Form.Control
          type="text"
          value={slug}
          onChange={(ev) => setSlug(ev.currentTarget.value)}
        />
      </Form.Group>
      <InheritableGameComponentsForm
        required={["docker_name"]}
        components={gameVal}
        onChange={(components) => setGameVal(components as Game)}
      />
      <Button variant="primary" onClick={handleFormSubmit}>
        Submit
      </Button>
    </Form>
  );
};
