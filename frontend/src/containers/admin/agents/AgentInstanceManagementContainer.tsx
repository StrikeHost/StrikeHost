import { TableMk2 } from "components/TableMk2";
import { Agent, Instance } from "interfaces/Instance";

export interface AgentInstanceManagementContainerProps {
  agent: Agent;
}

export const AgentInstanceManagementContainer = ({
  agent,
}: AgentInstanceManagementContainerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRow = (instance: Instance, Cell: (props: any) => JSX.Element) => {
    return (
      <>
        <Cell>{instance.memory}</Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </>
    );
  };

  return (
    <div>
      <TableMk2
        sourceUrl={`/admin/agent/${agent.id}/instance`}
        cols={4}
        columns={["", "", "", ""]}
        renderRow={renderRow}
      />
    </div>
  );
};
