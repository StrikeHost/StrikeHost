import styled from "styled-components";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { api } from "utils/api";
import { Agent } from "interfaces/Instance";
import { PageTitle } from "components/PageTitle";
import { TabbedContainer } from "components/TabbedContainer";
import { ManageAgentConfigContainer } from "./ManageAgentConfigContainer";
import { DetailedAgentPreview } from "components/admin/agent/DetailedAgentPreview";
import { AgentInstanceManagementContainer } from "./AgentInstanceManagementContainer";

interface ManageAgentContainerParams {
  agentId: string;
}

export const ManageAgentContainer = () => {
  const { agentId } = useParams<ManageAgentContainerParams>();

  const [agent, setAgent] = useState<Agent>();

  /**
   * Attempts to retrieve the latest data for the agent from the backend
   */
  const refetchAgent = () => {
    api
      .get<Agent>(`/admin/agent/${agentId}`)
      .then((response) => setAgent(response.data));
  };

  useEffect(() => {
    refetchAgent();
  }, []);

  return (
    <Container>
      <PageTitle className="pt-4" title="Manage Agent" />
      {agent && (
        <>
          <DetailedAgentPreview agent={agent} />
          <StyledContainer>
            <TabbedContainer
              id="agents-tab"
              titles={["Manage Agent", "Instances"]}
            >
              <StyledTab>
                <ManageAgentConfigContainer
                  agent={agent}
                  refetch={refetchAgent}
                />
              </StyledTab>
              <StyledTab>
                <AgentInstanceManagementContainer agent={agent} />
              </StyledTab>
            </TabbedContainer>
          </StyledContainer>
        </>
      )}
    </Container>
  );
};

const StyledContainer = styled.div``;

const StyledTab = styled.div`
  margin-left: 1rem;
`;
