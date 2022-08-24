import { Alert, Form } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";

import { api } from "utils/api";
import { Button } from "components/Button";
import { Image, ImageVersion } from "interfaces/Game";
import { InheritableGameComponentsForm } from "./game/InheritableGameComponentsForm";
import { Separator } from "components/text/Separator";

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

  const [image, setImage] = useState<Image>();
  const [name, setName] = useState<string>(version?.name || "");
  const [versionVal, setVersionVal] = useState<
    ImageVersion | Record<string, unknown>
  >(version || {});
  const [defaultVals, setDefaultVals] = useState<Record<string, unknown>>({});
  // const [argumentsText, setArgumentsText] = useState<string>(
  //   version ? formatArguments(version.arguments) : ""
  // );
  // const [versionArguments, setVersionArguments] = useState<
  //   Record<string, string>
  // >(version?.arguments || {});

  useEffect(() => {
    api.get<Image>(`/admin/image/${imageId}`).then((response) => {
      setImage(response.data);

      const newVals = {
        ...response.data.game,
        ...Object.fromEntries(
          Object.entries(response.data).filter(([key, value]) => {
            return value !== null || key === "min_memory";
          })
        ),
      };

      console.log(newVals);

      setDefaultVals(newVals);
      // setVersionVal(newVals);
    });
  }, []);

  /**
   * Invoked on form submit
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newVersion: Partial<ImageVersion> = {
      ...versionVal,
      name,
      image,
    };

    if (onSubmit) onSubmit(newVersion);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" value={image?.name} disabled={true} />
      </Form.Group>
      <Separator>Image Version Properties</Separator>
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
      <Separator>Inheritable Properties</Separator>
      <Alert variant="warning">
        <p>Warning!</p>
        <p className="mb-0">
          All the values on this page are <strong>required.</strong> If any are
          left blank, instances using this version could fail to launch and
          could cause issues. Please review the configuration below before
          proceeding.
        </p>
      </Alert>
      <InheritableGameComponentsForm
        requiredFields={[
          "docker_name",
          "min_memory",
          "min_storage",
          "min_cpu",
          "arguments",
        ]}
        defaultValues={defaultVals}
        components={versionVal}
        onChange={(components) => setVersionVal(components as ImageVersion)}
      />
      <Button variant="primary">Submit</Button>
    </Form>
  );
};
