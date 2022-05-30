import { Button } from "components/Button";
import { Grid } from "components/Grid";
import { Modal } from "components/Modal";
import { ResourceAllocation } from "interfaces/User";
import { useHistory } from "react-router";
import { formatDate } from "utils/misc";

export interface AllocatedResourceModalProps {
  isShown: boolean;
  onClose: () => void;
  resource: ResourceAllocation;
}

export const AllocatedResourceModal = ({
  isShown,
  onClose,
  resource,
}: AllocatedResourceModalProps) => {
  const history = useHistory();

  return null;

  // return (
  //   <Modal title="Allocated Resource" isShown={isShown} onClose={onClose}>
  //     <Grid columns={3} gap="1rem">
  //       <p>
  //         <strong>Memory: </strong>
  //         {resource.memory}MB
  //       </p>
  //       <p>
  //         <strong>Storage: </strong>
  //         {resource.storage}GB
  //       </p>
  //       <p>
  //         <strong>Allocated on: </strong>
  //         {formatDate(resource.created_at)}
  //       </p>
  //       {resource.instance && (
  //         <Button
  //           onClick={() =>
  //             history.push(`/admin/instance/${resource.instance?.id}`)
  //           }
  //         >
  //           View Instance
  //         </Button>
  //       )}
  //     </Grid>
  //   </Modal>
  // );
};
