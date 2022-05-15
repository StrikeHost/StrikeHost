import { Container } from "react-bootstrap";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import { User } from "interfaces/User";
import { Grid } from "components/Grid";
import { UserInfoPanel } from "components/admin/user/UserInfoPanel";
import { UserBillingPanel } from "components/admin/user/UserBillingPanel";

interface ManageUserContainerParams {
  userId: string;
}

export const ManageUserContainer = () => {
  const { userId } = useParams<ManageUserContainerParams>();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    api.get<User>(`/admin/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <Container className="pt-3">
      {user && (
        <Grid columns={6} gap="1rem">
          <UserInfoPanel user={user} />
          <UserBillingPanel />
        </Grid>
      )}
    </Container>
  );
};
