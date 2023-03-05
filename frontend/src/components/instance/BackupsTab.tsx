import { Button } from "components/Button";
import { Grid } from "components/Grid";
import { Panel } from "components/Panel";
import { Instance } from "interfaces/Instance";
import toast from "react-hot-toast";
import styled from "styled-components";
import { api } from "utils/api";
import { formatDateDiff } from "utils/misc";

interface BackupsTabProps {
  instance: Instance;
  onRefresh: () => void;
}

export const BackupsTab = ({ instance, onRefresh }: BackupsTabProps) => {
  const requestBackup = () => {
    api.post(`/instance/${instance.id}/backup`).then(() => {
      toast.success("Started backup process successfully!");
      onRefresh();
    });
  };

  return (
    <div>
      <Grid columns={1} className="p-4">
        <Panel
          title="Server Backups"
          actionText="Backup Now"
          onActionClick={() => requestBackup()}
        >
          {/* created at, download, restore, delete */}
          {instance.backups.map((backup) => (
            <StyledBackup>
              <p>{formatDateDiff(backup.created_at)}</p>
              <Button variant="primary">Download</Button>
              <Button variant="primary">Restore</Button>
              <Button variant="danger">Delete</Button>
            </StyledBackup>
          ))}
        </Panel>
      </Grid>
    </div>
  );
};

const StyledBackup = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  flex-direction: row;
  justify-content: space-between;

  & > p:first-child {
    flex: 1;
  }

  & p {
    margin: 0;
  }
`;
