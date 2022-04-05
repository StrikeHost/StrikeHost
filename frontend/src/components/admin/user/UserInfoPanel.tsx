import { User } from "interfaces/User";
import { Grid } from "components/Grid";
import { Panel } from "components/Panel";
import styled from "styled-components";
import { formatDate } from "utils/misc";
import { Button } from "components/Button";

export interface UserInfoPanelProps {
  user: User;
}

export const UserInfoPanel = ({ user }: UserInfoPanelProps) => {
  return (
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
        <Button variant="primary">Edit</Button>
        <Button variant="primary">Delete</Button>
      </StyledActionsContainer>
    </Panel>
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
