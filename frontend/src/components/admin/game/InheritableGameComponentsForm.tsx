import { useState } from "react";
import { Form } from "react-bootstrap";

import { Grid } from "components/Grid";
import { ArgumentsField } from "./ArgumentsField";
import { InheritableGameComponents } from "interfaces/Game";

export interface InheritableGameComponentsFormProps {
  components: InheritableGameComponents;
  onChange: (components: InheritableGameComponents) => void;
}

export const InheritableGameComponentsForm = ({
  onChange,
  components,
}: InheritableGameComponentsFormProps) => {
  const [values, setValues] = useState<InheritableGameComponents>(components);

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

  return (
    <Grid columns={2} gap="1rem 2rem" className="mb-3">
      <Form.Group>
        <Form.Label>Docker Name</Form.Label>
        <Form.Control
          type="text"
          value={values.docker_name || ""}
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
          value={values.min_memory || 1024}
          onChange={(ev) =>
            onValueChange("min_memory", parseInt(ev.currentTarget.value))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Min Storage</Form.Label>
        <Form.Control
          type="number"
          value={values.min_storage || 1024}
          onChange={(ev) =>
            onValueChange("min_storage", parseInt(ev.currentTarget.value))
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Min CPUs</Form.Label>
        <Form.Control
          type="number"
          value={values.min_cpu || 1}
          onChange={(ev) =>
            onValueChange("min_cpu", parseInt(ev.currentTarget.value))
          }
        />
      </Form.Group>
      <ArgumentsField
        args={values.arguments || {}}
        onArgumentsChange={(args) => onValueChange("arguments", args)}
      />
    </Grid>
  );
};
