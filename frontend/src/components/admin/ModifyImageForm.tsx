import { Form } from "react-bootstrap";

import { Game, Image } from "interfaces/Game";
import { Button } from "components/Button";
import React, { useState } from "react";
import slugify from "slugify";
import { InheritableGameComponentsForm } from "./game/InheritableGameComponentsForm";
import { Separator } from "components/text/Separator";

export interface ModifyImageFormProps {
  game: Game;
  image?: Image;
  onSubmit?: (image: Partial<Image>) => void;
}

export const ModifyImageForm = ({
  game,
  image,
  onSubmit,
}: ModifyImageFormProps) => {
  const [name, setImageName] = useState<string>(image?.name || "");
  const [slug, setImageSlug] = useState<string>(image?.slug || "");
  const [inheritableComponents, setInheritableComponents] = useState<
    Partial<Image>
  >(image || {});

  /**
   * Invoked on image name change event
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleImageNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageName(event.currentTarget.value);
    const slug = slugify(event.currentTarget.value, { lower: true });
    setImageSlug(slug);
  };

  /**
   * Invoked on form submit
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const img: Partial<Image> = {
      ...inheritableComponents,
      name,
      slug,
    };

    if (onSubmit) onSubmit(img);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Game Name</Form.Label>
        <Form.Control disabled type="text" value={game.name} />
      </Form.Group>
      <Separator>Image Properties</Separator>
      <Form.Group className="mb-2">
        <Form.Label>Image Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          required={true}
          defaultValue={image?.name}
          onChange={handleImageNameChange}
        />
      </Form.Group>
      <Separator>Inheritable Properties</Separator>
      <InheritableGameComponentsForm
        defaultValues={game}
        components={inheritableComponents}
        onChange={setInheritableComponents}
        requiredFields={["docker_name", "min_memory"]}
      />
      <Button variant="primary">Submit</Button>
    </Form>
  );
};
