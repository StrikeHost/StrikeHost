import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { Grid } from "components/Grid";
import { ArgumentsField } from "./ArgumentsField";
import { InheritableGameComponents } from "interfaces/Game";
import { Separator } from "components/text/Separator";

export interface InheritableGameComponentsFormProps {
  required?: string[];
  components: InheritableGameComponents;
  onChange: (components: InheritableGameComponents) => void;
}

/**
 * Formats the arguments list so it can be displayed
 *
 * @returns {string}
 */
const formatArguments = (args: Record<string, string>) => {
  return Object.keys(args)
    .map((key) => `${key}=${args[key]}`)
    .join("\n");
};

export const InheritableGameComponentsForm = ({
  required,
  onChange,
  components,
}: InheritableGameComponentsFormProps) => {
  const [values, setValues] = useState<InheritableGameComponents>(components);
  const [argumentsText, setArgumentsText] = useState<string>(
    components.arguments ? formatArguments(components.arguments) : ""
  );

  const isRequired = (element: string) => {
    const index = required?.indexOf(element);

    return Boolean(index && index > -1);
  };

  /**
   * Invoked on value change
   *
   * @param {string} key
   * @param {any} value
   */
  const onValueChange = (key: string, value: any) => {
    const newValues = { ...values, [key]: value };

    setValues(newValues);
    onChange(newValues);
  };

  /**
   * Invoked on arguments change
   *
   * @param event
   */
  const handleArgumentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = event.currentTarget.value.split("\n");
    const newArgs: Record<string, string> = {};
    lines.forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        newArgs[parts[0]] = parts[1];
      }
    });

    setValues({
      ...values,
      arguments: newArgs,
    });

    setArgumentsText(event.currentTarget.value);
    onChange({
      ...values,
      arguments: newArgs,
    });
  };

  return (
    <>
      <Separator>Inheritable Components</Separator>
      <Grid columns={2} gap="1rem 2rem" className="mb-3">
        <Form.Group>
          <Form.Label>Docker Name</Form.Label>
          <Form.Control
            type="text"
            value={values.docker_name || ""}
            onChange={(ev) =>
              onValueChange("docker_name", ev.currentTarget.value)
            }
            required={isRequired("docker_name")}
          />
        </Form.Group>
        {/* min memory, min storage and min cpus */}
        <Form.Group>
          <Form.Label>Min Memory (MB)</Form.Label>
          <Form.Control
            type="number"
            value={values.min_memory}
            onChange={(ev) =>
              onValueChange("min_memory", parseInt(ev.currentTarget.value))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Min Storage (GB)</Form.Label>
          <Form.Control
            type="number"
            value={values.min_storage}
            onChange={(ev) =>
              onValueChange("min_storage", parseInt(ev.currentTarget.value))
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Min CPUs</Form.Label>
          <Form.Control
            type="number"
            value={values.min_cpu}
            onChange={(ev) =>
              onValueChange("min_cpu", parseInt(ev.currentTarget.value))
            }
          />
        </Form.Group>
        {/* <ArgumentsField
        args={values.arguments || {}}
        onArgumentsChange={(args) => onValueChange("arguments", args)}
      /> */}

        <Form.Group>
          <Form.Label>Docker Arguments</Form.Label>
          <Form.Control
            rows={5}
            type="text"
            value={argumentsText}
            as="textarea"
            required={true}
            onChange={(event) =>
              handleArgumentsChange(
                event as React.ChangeEvent<HTMLTextAreaElement>
              )
            }
            placeholder={"arg1=value1\narg2=value2"}
          />
        </Form.Group>
      </Grid>
    </>
  );
};
