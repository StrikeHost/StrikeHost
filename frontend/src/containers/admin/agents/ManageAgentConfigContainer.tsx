import toast from "react-hot-toast";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext, useEffect, useState } from "react";

import { api } from "utils/api";
import { SocketContext } from "App";
import { Link } from "components/Link";
import { Code } from "components/Code";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { Agent } from "interfaces/Instance";
import { formatDate, formatTime } from "utils/misc";

interface AddSecretResponse {
  token: string;
}

export interface ManageAgentConfigContainerProps {
  agent: Agent;
  refetch: () => void;
}

// This panel needs to have the following functionality:
// 1 - Download latest agent updates and restart the agent
// 2 - Restart the agent
// 3 - Erase local database and forget settings
// Others?
export const ManageAgentConfigContainer = ({
  agent,
  refetch,
}: ManageAgentConfigContainerProps) => {
  const history = useHistory();
  const { client } = useContext(SocketContext);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState<boolean>(false);
  const [isEraseModalOpen, setIsEraseModalOpen] = useState<boolean>(false);
  const [isAddSecretModalOpen, setIsAddSecretModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [agentSecret, setAgentSecret] = useState<string>("");

  /**
   * Invoked upon an incoming message from the server
   *
   * @param {SocketEvent} event
   */
  const handleSocketEvent = () => {
    // Do something
  };

  // Attempts to restart the agent
  const handleAgentRestart = () => {
    api.post(`/admin/agent/${agent.id}/restart`).then(() => {
      toast.success("Agent is restarting...");
    });

    setIsRestartModalOpen(false);
  };

  // Attempts to update and restart the agent
  const handleAgentUpdate = () => {
    api.post(`/admin/agent/${agent.id}/update`).then(() => {
      toast.success("Agent is updating...");
    });

    setIsUpdateModalOpen(false);
  };

  // Attempts to reset and restart the agent
  const handleAgentReset = () => {
    api.post(`/admin/agent/${agent.id}/reset`).then(() => {
      toast.success("Agent is resetting...");
    });

    setIsEraseModalOpen(false);
  };

  // Invoked on add agent secret click
  const handleShowAddAgentSecret = () => {
    setIsAddSecretModalOpen(true);
  };

  // Attempts to create a new secret that can be used for authenticating the
  // agent
  const handleAddAgentSecret = () => {
    api
      .post<AddSecretResponse>(`/admin/agent/${agent.id}/secret`)
      .then((response) => {
        setAgentSecret(response.data.token);
        refetch();
      });
  };

  /**
   * Invoked on agent secret close button click
   */
  const handleAgentSecretClose = () => {
    setIsAddSecretModalOpen(false);
    setAgentSecret("");
  };

  /**
   * Invoked on agent delete open modal button clicked
   */
  const handleOpenDeleteAgent = () => {
    setIsDeleteModalOpen(true);
  };

  /**
   * Invoked on agent delete button clicked
   */
  const handleDeleteAgent = () => {
    api.post(`/admin/agent/${agent.id}/delete`).then(() => {
      toast.success("Agent successfully deleted!");
      history.push("/admin/agent");
    });
  };

  useEffect(() => {
    client?.on("message", handleSocketEvent);
  }, []);

  return (
    <>
      <StyledContainer>
        <StyledOptionContainer>
          <h3>Update agent</h3>
          <p>
            Caution! This will pull down the latest code from GitHub and then
            attempt to restart the agent. This will result in downtime for
            instances that are running on this agent as they will need to be
            stopped and then re-started. This cannot be undone.
          </p>
          <Button onClick={() => setIsUpdateModalOpen(true)}>
            Update and restart
          </Button>
        </StyledOptionContainer>
        <StyledOptionContainer>
          <h3>Restart agent</h3>
          <p>
            Caution! This will stop all instances running on this agent, attempt
            to restart the agent, and then attempt to restart all instances that
            were previously running. This will result in downtime for instances
            that are running on this instance.
          </p>
          <Button onClick={() => setIsRestartModalOpen(true)}>
            Restart agent
          </Button>
        </StyledOptionContainer>
        <StyledOptionContainer>
          <h3>Erase local database and restart agent</h3>
          <p>
            Caution! This will stop all instances running on this agent, erase
            the local database (this will remove any configured settings), and
            then attempt to restart the agent. This will then cause it to be
            registered as if it were a new agent. This cannot be undone.
          </p>
          <Button onClick={() => setIsEraseModalOpen(true)} variant="danger">
            Erase database and restart agent
          </Button>
        </StyledOptionContainer>
        <StyledOptionContainer>
          <h3 className="mb-4">Agent Secrets</h3>
          <Table bordered variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Added By</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {agent.secrets &&
                agent.secrets.map((secret) => (
                  <tr>
                    <td>{secret.id}</td>
                    <td>{secret.disabled_at ? "Disabled" : "Active"}</td>
                    <td>
                      <Link to={`/admin/user/${secret.created_by.id}`}>
                        {secret.created_by.first_name}{" "}
                        {secret.created_by.last_name}
                      </Link>
                    </td>
                    <td>
                      {formatDate(secret.created_at)} at{" "}
                      {formatTime(secret.created_at)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button onClick={handleShowAddAgentSecret}>Add Secret</Button>
        </StyledOptionContainer>
        <StyledOptionContainer>
          <h3 className="mb-4">Delete Agent</h3>
          <Button variant="danger" onClick={handleOpenDeleteAgent}>
            Delete Agent
          </Button>
        </StyledOptionContainer>
      </StyledContainer>
      <Modal
        isShown={isUpdateModalOpen}
        // title="Update agent"
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <p>
          Are you sure you want to attempt to update the agent and restart? This
          will cause unavoidable downtime for connected instances.
        </p>
        <Button onClick={handleAgentUpdate}>Confirm</Button>
      </Modal>
      <Modal
        isShown={isRestartModalOpen}
        // title="Restart agent"
        onClose={() => setIsRestartModalOpen(false)}
      >
        <p>
          Are you sure you want to restart the agent? This will cause
          unavoidable downtime for connected instances.
        </p>
        <Button onClick={handleAgentRestart}>Confirm</Button>
      </Modal>
      <Modal
        isShown={isEraseModalOpen}
        // title="Erase local database and restart agent"
        onClose={() => setIsEraseModalOpen(false)}
      >
        <p>
          Are you sure you want to{" "}
          <strong>completely and permanently erase</strong> the local database
          for this agent? All associated data will be permanently lost. This
          cannot be undone.
        </p>
        <Button variant="danger" onClick={handleAgentReset}>
          Confirm
        </Button>
      </Modal>
      <Modal
        // title="Add Agent Secret"
        onClose={() => setIsAddSecretModalOpen(false)}
        isShown={isAddSecretModalOpen}
      >
        {agentSecret.length === 0 ? (
          <>
            <p>
              Are you sure you want to create a new secret that can be used to
              authenticate this agent?
            </p>
            <Button onClick={handleAddAgentSecret}>Confirm</Button>
          </>
        ) : (
          <>
            <p>Secret successfully created!</p>
            <p>Your new agent secret is:</p>
            <Code className="mb-4">{agentSecret}</Code>
            <p>This will not be shown again, so store this somewhere safe.</p>
            <Button onClick={handleAgentSecretClose}>Done</Button>
          </>
        )}
      </Modal>
      <Modal
        // title="Delete Agent"
        onClose={() => setIsDeleteModalOpen(false)}
        isShown={isDeleteModalOpen}
      >
        <p>Are you sure you want to delete this agent?</p>
        <p>
          This will permanently de-register the agent from the backend - this
          cannot be undone.
        </p>
        <p>
          Any instances linked to this agent will be transferred to another
          node.
        </p>
        <Button variant="danger" onClick={handleDeleteAgent}>
          Yes, delete this agent
        </Button>
      </Modal>
    </>
  );
};

const StyledContainer = styled.div`
  margin-left: 1rem;
`;

const StyledOptionContainer = styled.div`
  margin-bottom: 2rem;
`;
