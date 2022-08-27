// export interface ActionsTablePanelProps {}

import { Panel } from "components/Panel";
import { TableMk2 } from "components/TableMk2";
import { Event } from "interfaces/Event";

export const ActionsTablePanel = () => {
  const renderRow = (event: Event, Cell: (props: unknown) => JSX.Element) => {
    return (
      <>
        <Cell></Cell>
        <Cell></Cell>
      </>
    );
  };

  // TODO
  return (
    <Panel title="Recent Actions" span={4}>
      <TableMk2
        cols={2}
        defaultAmt={20}
        columns={["", ""]}
        renderRow={renderRow}
        sourceUrl="/admin/events"
      />
    </Panel>
  );
};
