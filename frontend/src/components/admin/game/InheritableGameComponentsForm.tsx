import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { Grid } from "components/Grid";
import { InheritableGameComponents } from "interfaces/Game";

export interface InheritableGameComponentsFormProps {
  requiredFields?: string[];
  components: InheritableGameComponents;
  defaultValues?: InheritableGameComponents;
  onChange: (components: InheritableGameComponents) => void;
}

/**
 * Formats a list of custom arguments so they can be displayed
 *
 * @param {Record<string, string>} args
 * @returns {string}
 */
const formatArguments = (args: Record<string, string>) => {
  return Object.keys(args)
    .map((key) => `${key}=${args[key]}`)
    .join("\n");
};

export const InheritableGameComponentsForm = ({
  onChange,
  components,
  defaultValues,
  requiredFields,
}: InheritableGameComponentsFormProps) => {
  const [values, setValues] =
    useState<Partial<InheritableGameComponents>>(components);
  const [argumentsText, setArgumentsText] = useState<string>("");
  const [argumentsPlaceholder, setArgumentsPlaceholder] = useState<string>("");

  /**
   * Is the specified field required?
   *
   * @param {string} fieldName
   * @returns {boolean}
   */
  const isRequired = (fieldName: string): boolean => {
    const defaults: Record<string, unknown> =
      (defaultValues as Record<string, unknown>) || {};
    return Boolean(requiredFields?.includes(fieldName)) && !defaults[fieldName];
  };

  /**
   * Invoked on value change
   *
   * @param {string} key
   * @param {unknown} value
   */
  const onValueChange = (key: string, value: unknown) => {
    const newValues = {
      ...components,
      [key]: value,
    };

    setValues(newValues);
    onChange(newValues);
  };

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

    setArgumentsText(event.currentTarget.value);
    setValues({
      ...values,
      arguments: newArgs,
    });
    onChange({
      ...values,
      arguments: newArgs,
    });
  };

  useEffect(() => {
    if (components.arguments) {
      setArgumentsText(formatArguments(components.arguments));
    }

    if (defaultValues?.arguments) {
      setArgumentsPlaceholder(formatArguments(defaultValues.arguments));
    }

    const vals = {
      ...components,
    };

    onChange(vals);
  }, [defaultValues]);

  return (
    <Grid columns={2} gap="1rem 2rem" className="mb-3">
      <Form.Group>
        <Form.Label>Docker Name</Form.Label>
        <Form.Control
          type="text"
          value={values.docker_name || ""}
          required={isRequired("docker_name")}
          placeholder={defaultValues?.docker_name}
          onChange={(ev) =>
            onValueChange("docker_name", ev.currentTarget.value)
          }
        />
      </Form.Group>
      {/* min memory, min storage and min cpus */}
      <Form.Group>
        <Form.Label>Min Memory</Form.Label>
        <Form.Control
          type="number"
          value={values.min_memory}
          placeholder={String(defaultValues?.min_memory || "")}
          required={isRequired("min_memory")}
          onChange={(ev) =>
            onValueChange("min_memory", parseInt(ev.currentTarget.value))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Min Storage</Form.Label>
        <Form.Control
          type="number"
          value={values.min_storage}
          placeholder={String(defaultValues?.min_storage || "")}
          required={isRequired("min_storage")}
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
          defaultValue={components.min_cpu}
          required={isRequired("min_cpu")}
          placeholder={String(defaultValues?.min_cpu || "")}
          onChange={(ev) =>
            onValueChange("min_cpu", parseInt(ev.currentTarget.value))
          }
        />
      </Form.Group>
      {/* <ArgumentsField
        args={values.arguments}
        onArgumentsChange={(targs) => handleArgumentsChange(targs)}
      /> */}
      {/* <ArgumentsFieldNew
        args={values.arguments}
        onArgumentsChange={(targs) => handleArgumentsChange(targs)}
      /> */}
      <Form.Group>
        <Form.Label>Custom Docker Arguments</Form.Label>
        <Form.Control
          rows={5}
          type="text"
          value={argumentsText || ""}
          as="textarea"
          onChange={handleArgumentsChange}
          placeholder={argumentsPlaceholder}
          required={isRequired("arguments")}
        />
      </Form.Group>
    </Grid>
  );
};
