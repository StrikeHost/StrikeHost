import { Button } from "components/Button";
import { Grid } from "components/Grid";
import { Modal } from "components/Modal";
import { Panel } from "components/Panel";
import { Instance } from "interfaces/Instance";
import prettyBytes from "pretty-bytes";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { api } from "utils/api";
import { formatDateDiff } from "utils/misc";

interface BackupsTabProps {
  instance: Instance;
  onRefresh: () => void;
}

export const BackupsTab = ({ instance, onRefresh }: BackupsTabProps) => {
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);

  const requestBackup = () => {
    api.post(`/instance/${instance.id}/backup`).then(() => {
      toast.success("Started backup process successfully!");
      onRefresh();
    });
  };

  /**
   * Invoked on delete backup modal open
   *
   * @param {string} backupId
   */
  const handleDeleteModalOpen = (backupId: string) => {
    setIsDeleteModalShown(true);
    setSelectedBackupId(backupId);
  };

  /**
   * Invoked on delete backup confirm click
   *
   * @returns {void}
   */
  const handleDeleteBackupClick = () => {
    if (!selectedBackupId) {
      return;
    }

    api.delete(`/instance-backup/${selectedBackupId}`).then(() => {
      toast.success("Deleted backup successfully!");
      onRefresh();
      setIsDeleteModalShown(false);
    });
  };

  /**
   * Invoked on download backup click
   *
   * @param {string} backupId
   */
  const handleDownloadClick = (backupId: string) => {
    api.get<string>(`/instance-backup/${backupId}`).then((res) => {
      // Open a new tab with the download link
      window.open(res.data, "_blank");
    });
  };

  return (
    <>
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
                <p>{prettyBytes(backup.size)}</p>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleDownloadClick(backup.backupId)}
                >
                  Download
                </Button>
                <Button variant="primary" size="sm" disabled>
                  Restore
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteModalOpen(backup.backupId)}
                >
                  Delete
                </Button>
              </StyledBackup>
            ))}
          </Panel>
        </Grid>
      </div>
      <Modal
        title="Delete Backup"
        isShown={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
      >
        <p>Are you sure you want to delete this backup?</p>

        <div className="mt-4">
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDeleteBackupClick()}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
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
