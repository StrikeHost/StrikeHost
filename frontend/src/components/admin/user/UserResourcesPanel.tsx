import toast from "react-hot-toast";
import React, { useState } from "react";

import { api } from "utils/api";
import { User } from "interfaces/User";
import { Grid } from "components/Grid";
import { Panel } from "components/Panel";
import { Table } from "components/Table";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { Input } from "components/form/Input";
import { Label } from "components/form/Label";

export interface UserResourcesPanelProps {
  user: User;
  refresh?: () => void;
}

export const UserResourcesPanel = ({
  user,
  refresh,
}: UserResourcesPanelProps) => {
  const [isAllocateModalShown, setIsAllocateModalShown] =
    useState<boolean>(false);

  const [cpus, setCpus] = useState<number>(0);
  const [memory, setMemory] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);

  /**
   * Invoked on allocate modal close
   */
  const handleAllocateModalClose = (event: React.FormEvent) => {
    event.preventDefault();

    const request = {
      cpus,
      memory,
      storage,
    };

    api
      .post(`/admin/user/${user.id}/resource`, request)
      .then(() => {
        setIsAllocateModalShown(false);
        setCpus(0);
        setMemory(0);
        setStorage(0);
        toast.success("Allocated resource successfully!");
        refresh && refresh();
      })
      .catch(() => {
        toast.error("Couldn't allocate resource");
      });
  };

  return (
    <>
      <Panel
        span={6}
        title="Resource Allocations"
        actionText="Create"
        onActionClick={() => setIsAllocateModalShown(true)}
      >
        <Table data={user.resource_allocations} keys={["ID"]} />
      </Panel>
      <Modal
        isShown={isAllocateModalShown}
        onClose={() => setIsAllocateModalShown(false)}
      >
        <form onSubmit={handleAllocateModalClose}>
          <Grid columns={2} gap="1rem 2rem" className="mb-3">
            <div>
              <Label>CPUs</Label>
              <Input
                required
                value={cpus}
                type="number"
                onChange={(event) =>
                  setCpus(Number.parseInt(event.currentTarget.value))
                }
              ></Input>
            </div>
            <div>
              <Label>Memory (MB)</Label>
              <Input
                required
                type="number"
                value={memory}
                onChange={(event) =>
                  setMemory(Number.parseInt(event.currentTarget.value))
                }
              ></Input>
            </div>
            <div>
              <Label>Storage (GB)</Label>
              <Input
                required
                type="number"
                value={storage}
                onChange={(event) =>
                  setStorage(Number.parseInt(event.currentTarget.value))
                }
              ></Input>
            </div>
          </Grid>
          <Button fill>Create</Button>
        </form>
      </Modal>
    </>
  );
};
