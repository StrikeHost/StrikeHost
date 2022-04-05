import { Form } from "react-bootstrap";

import { Image } from "interfaces/Game";
import { Button } from "components/Button";
import React, { useState } from "react";
import slugify from "slugify";

export interface ModifyImageFormProps {
  image?: Image;
  onSubmit?: (image: Partial<Image>) => void;
}

export const ModifyImageForm = ({ image, onSubmit }: ModifyImageFormProps) => {
  const [name, setImageName] = useState<string>(image?.name || "");
  const [slug, setImageSlug] = useState<string>(image?.slug || "");
  const [min_memory, setImageMemory] = useState<number>(
    image?.min_memory || 1024
  );
  const [docker_name, setImageDockerName] = useState<string>(
    image?.docker_name || ""
  );

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
  const handleSubmit = () => {
    const img: Partial<Image> = {
      name,
      slug,
      docker_name,
      min_memory,
    };

    if (onSubmit) onSubmit(img);
  };

  return (
    <Form>
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
      <Form.Group className="mb-2">
        <Form.Label>Docker Image Name</Form.Label>
        <Form.Control
          type="text"
          required={true}
          value={docker_name}
          defaultValue={image?.docker_name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setImageDockerName(event.currentTarget.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Minimum Memory (MB)</Form.Label>
        <Form.Control
          min={512}
          type="number"
          required={true}
          value={min_memory}
          defaultValue={image?.min_memory || 1024}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setImageMemory(Number.parseInt(event.currentTarget.value))
          }
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
