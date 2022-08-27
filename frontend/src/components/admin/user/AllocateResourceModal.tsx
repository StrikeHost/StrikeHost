import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import { User } from "interfaces/User";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { api } from "utils/api";
import toast from "react-hot-toast";

const INITIAL_MEMORY = 1024;
const INITIAL_STORAGE = 30;

export interface AllocateResourceModalProps {
  user: User;
  isShown: boolean;
  onClose: (refresh?: boolean) => void;
}

export const AllocateResourceModal = ({
  user,
  isShown,
  onClose,
}: AllocateResourceModalProps) => {
  const [memory, setMemory] = useState<number>(INITIAL_MEMORY);
  const [storage, setStorage] = useState<number>(INITIAL_STORAGE);

  /**
   * Invoked on form submit
   */
  const onSubmit = () => {
    const request = {
      memory,
      storage,
    };

    api
      .post(`/admin/user/${user.id}/resource`, request)
      .then(() => {
        onClose(true);
        setMemory(INITIAL_MEMORY);
        setStorage(INITIAL_STORAGE);
        toast.success("Allocated resource successfully!");
      })
      .catch(() => {
        toast.error("Couldn't allocate resource");
      });
  };

  return null;

  // return (
  //   <Modal isShown={isShown} title="Allocate Resource" onClose={onClose}>
  //     <Form>
  //       <Form.Group className="mb-3" controlId="memory">
  //         <Form.Label>Memory</Form.Label>
  //         <InputGroup>
  //           <Form.Control
  //             type="number"
  //             id="memory"
  //             value={memory}
  //             onChange={(event) =>
  //               setMemory(Number.parseInt(event.currentTarget.value))
  //             }
  //           />
  //           <InputGroup.Text>MB</InputGroup.Text>
  //         </InputGroup>
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="storage">
  //         <Form.Label>Storage</Form.Label>
  //         <InputGroup>
  //           <Form.Control
  //             type="number"
  //             id="storage"
  //             value={storage}
  //             onChange={(event) =>
  //               setStorage(Number.parseInt(event.currentTarget.value))
  //             }
  //           />
  //           <InputGroup.Text>GB</InputGroup.Text>
  //         </InputGroup>
  //       </Form.Group>
  //       <Button onClick={onSubmit}>Allocate Resource</Button>
  //     </Form>
  //   </Modal>
  // );
};
