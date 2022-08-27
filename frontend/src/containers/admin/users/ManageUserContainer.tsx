import { Container } from "react-bootstrap";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "utils/api";
import { User } from "interfaces/User";
import { Grid } from "components/Grid";
import { UserInfoPanel } from "components/admin/user/UserInfoPanel";
import { UserBillingPanel } from "components/admin/user/UserBillingPanel";
import { UserResourcesPanel } from "components/admin/user/UserResourcesPanel";

interface ManageUserContainerParams {
  userId: string;
}

export const ManageUserContainer = () => {
  const { userId } = useParams<ManageUserContainerParams>();

  const [user, setUser] = useState<User>();

  const refreshUser = () => {
    api.get<User>(`/admin/user/${userId}`).then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Container className="pt-3">
      {user && (
        <Grid columns={6} gap="1rem">
          <UserInfoPanel user={user} />
          <UserBillingPanel />
          <UserResourcesPanel user={user} refresh={refreshUser} />
        </Grid>
      )}
    </Container>
  );
};
