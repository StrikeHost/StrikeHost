import { Grid } from "components/Grid";
import { Panel } from "components/Panel";
import { Instance } from "interfaces/Instance";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { api } from "utils/api";

interface PropertiesTabProps {
  instance: Instance;
  onRefresh: () => void;
}

export const PropertiesTab = ({ instance, onRefresh }: PropertiesTabProps) => {
  /**
   * Invoked on form submit
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleChange = (propertyName: string, value: any) => {
    api
      .post(`/instance/${instance.id}/update`, {
        [propertyName]: value,
      })
      .then(() => {
        toast.success("Instance updated successfully!");
        onRefresh();
      });
  };

  return (
    <div>
      <Grid columns={1} className="p-4">
        <Panel title="Server Properties">
          <Form className="p-2">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Enable backups"
                checked={instance.is_backups_enabled}
                onChange={(e) =>
                  handleChange("is_backups_enabled", e.target.checked)
                }
              />
            </Form.Group>
          </Form>
        </Panel>
      </Grid>
    </div>
  );
};
