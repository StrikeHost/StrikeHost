import { Link } from "components/Link";
import { PageTitle } from "components/PageTitle";
import { TableMk2 } from "components/TableMk2";
import { User } from "interfaces/User";
import { Container } from "react-bootstrap";

export const UsersContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRow = (user: User, Cell: (props: any) => JSX.Element) => {
    return (
      <>
        <Cell>
          <Link to={`/admin/user/${user.id}`}>
            {user.id.substring(0, 8)}...
          </Link>
        </Cell>
        <Cell>{user.first_name}</Cell>
        <Cell>{user.last_name}</Cell>
        <Cell>{user.email}</Cell>
      </>
    );
  };

  return (
    <Container>
      <PageTitle className="pt-4" title="Users" />
      <TableMk2
        sourceUrl="/admin/user"
        cols={4}
        columns={["ID", "First Name", "Last Name", "Email"]}
        renderRow={renderRow}
      />
    </Container>
  );
};
