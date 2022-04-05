import { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { Container, Form } from "react-bootstrap";

import { api } from "utils/api";
import { Link } from "components/Link";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { Agent } from "interfaces/Instance";
import { TableMk2 } from "components/TableMk2";
import { PageTitle } from "components/PageTitle";
import { formatDate, formatTime } from "utils/misc";

export const AgentsContainer = () => {
  const history = useHistory();

  const [isAddAgentModalOpen, setIsAddAgentModalOpen] =
    useState<boolean>(false);
  const [ipAddress, setIpAddress] = useState<string>("");

  /**
   * Invoked on add agent click
   */
  const handleAddAgent = () => {
    api.post<Agent>("/admin/agent", { ip: ipAddress }).then((response) => {
      toast.success("Created agent!");
      history.push(`/admin/agent/${response.data.id}`);
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRow = (agent: Agent, Cell: (props: any) => JSX.Element) => {
    return (
      <>
        <Cell>
          <Link to={`/admin/agent/${agent.id}`}>{agent.ip}</Link>
        </Cell>
        <Cell>{agent.cores}</Cell>
        <Cell>{agent.memory}MB</Cell>
        <Cell>
          {formatDate(agent.created_at)} at {formatTime(agent.created_at)}
        </Cell>
      </>
    );
  };

  return (
    <>
      <Container>
        <PageTitle
          className="pt-4"
          title="Agents"
          action="Add Agent"
          onClick={() => setIsAddAgentModalOpen(true)}
        />
        <TableMk2
          cols={4}
          renderRow={renderRow}
          columns={["IP Address", "CPU Cores", "Memory", "Created At"]}
          sourceUrl="/admin/agent"
        />
      </Container>
      <Modal
        isShown={isAddAgentModalOpen}
        onClose={() => setIsAddAgentModalOpen(false)}
        title="Add Agent"
      >
        <Form>
          <Form.Group className="mb-3" controlId="ip">
            <Form.Label>IP Address</Form.Label>
            <Form.Control
              type="text"
              id="ipAddress"
              value={ipAddress}
              placeholder="IP Address"
              onChange={(event) => setIpAddress(event.currentTarget.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddAgent}>
            Add Agent
          </Button>
        </Form>
      </Modal>
    </>
  );
};
