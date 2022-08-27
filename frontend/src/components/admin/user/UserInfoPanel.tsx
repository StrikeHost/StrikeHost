import { useState } from "react";
import styled from "styled-components";

import { User } from "interfaces/User";
import { Grid } from "components/Grid";
import { formatDate } from "utils/misc";
import { Panel } from "components/Panel";
import { Modal } from "components/Modal";
import { Button } from "components/Button";
import { SecondaryText } from "components/text/SecondaryText";
import { api } from "utils/api";
import toast from "react-hot-toast";
import { useHistory } from "react-router";

export interface UserInfoPanelProps {
  user: User;
}

export const UserInfoPanel = ({ user }: UserInfoPanelProps) => {
  const history = useHistory();
  const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);

  // Invoked on delete user confirm
  const handleDeleteUser = () => {
    api
      .post(`/admin/user/${user.id}/delete`)
      .then(() => {
        toast.success("Deleted user successfully!");
        history.push("/admin/user");
      })
      .catch(() => {
        toast.error("Couldn't delete user");
        setIsDeleteModalShown(false);
      });
  };

  return (
    <>
      <Panel span={3} title="User">
        <Grid columns={4} gap="1rem" className="p-4">
          <StyledInfoText>
            <p>First Name</p>
            <p>{user.first_name}</p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Last Name</p>
            <p>{user.last_name}</p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Email</p>
            <p>{user.email}</p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Email Verified</p>
            <p></p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Status</p>
            <p>{user.admin ? "Admin" : "User"}</p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Created</p>
            <p>{formatDate(user.created_at)}</p>
          </StyledInfoText>
          <StyledInfoText>
            <p>Last Login</p>
            <p></p>
          </StyledInfoText>
        </Grid>
        <StyledActionsContainer className="px-4 pb-4">
          <Button variant="primary" disabled>
            Edit
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteModalShown(true)}>
            Delete
          </Button>
        </StyledActionsContainer>
      </Panel>
      <Modal
        isShown={isDeleteModalShown}
        onClose={() => setIsDeleteModalShown(false)}
      >
        <SecondaryText>
          Are you sure you want to delete this user?
        </SecondaryText>
        <p>
          Are you sure you want to delete {user.first_name} {user.last_name}?
          This will irrevocably delete any data associated with their account,
          including instances, resource allocations, etc.
        </p>
        <StyledButtonsContainer>
          <Button
            variant="success"
            onClick={() => {
              setIsDeleteModalShown(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </StyledButtonsContainer>
      </Modal>
    </>
  );
};

const StyledInfoText = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;

  & > p {
    margin: 0;
  }

  & > p:nth-child(2) {
    font-weight: 700;
  }
`;

const StyledActionsContainer = styled.div`
  gap: 0.7rem;
  display: flex;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
