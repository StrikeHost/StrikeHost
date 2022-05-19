import { Form } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";

import { api } from "utils/api";
import { Button } from "components/Button";
import { Image, ImageVersion } from "interfaces/Game";
import { InheritableGameComponentsForm } from "./game/InheritableGameComponentsForm";

export interface ModifyVersionFormProps {
  version?: ImageVersion;
  onSubmit?: (version: Partial<ImageVersion>) => void;
}

interface ModifyVersionFormParams {
  imageId: string;
}

export const ModifyVersionForm = ({
  version,
  onSubmit,
}: ModifyVersionFormProps) => {
  const { imageId } = useParams<ModifyVersionFormParams>();

  const formatArguments = (args: Record<string, string>) => {
    return Object.keys(args)
      .map((key) => `${key}=${args[key]}`)
      .join("\n");
  };

  const [image, setImage] = useState<Image>();
  const [name, setName] = useState<string>(version?.name || "");
  const [versionVal, setVersionVal] = useState<
    ImageVersion | Record<string, unknown>
  >(version || {});
  // const [argumentsText, setArgumentsText] = useState<string>(
  //   version ? formatArguments(version.arguments) : ""
  // );
  // const [versionArguments, setVersionArguments] = useState<
  //   Record<string, string>
  // >(version?.arguments || {});

  useEffect(() => {
    api.get<Image>(`/admin/image/${imageId}`).then((response) => {
      setImage(response.data);
    });
  }, []);

  /**
   * Invoked on arguments change
   *
   * @param event
   */
  const handleArgumentsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const lines = event.currentTarget.value.split("\n");
    const newArgs: Record<string, string> = {};
    lines.forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        newArgs[parts[0]] = parts[1];
      }
    });

    // setVersionArguments(newArgs);
    // setArgumentsText(event.currentTarget.value);
  };

  /**
   * Invoked on form submit
   */
  const handleSubmit = () => {
    const newVersion: Partial<ImageVersion> = {
      name,
      image,
      // arguments: versionArguments,
    };

    if (onSubmit) onSubmit(newVersion);
  };

  return (
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" value={image?.name} disabled={true} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Image Version Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          required={true}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.currentTarget.value)
          }
        />
      </Form.Group>
      <InheritableGameComponentsForm
        components={versionVal}
        onChange={(components) => setVersionVal(components as ImageVersion)}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
