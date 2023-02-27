import { Link } from "components/Link";
import { PageTitle } from "components/PageTitle";
import { TableMk2 } from "components/TableMk2";
import { User } from "interfaces/User";
import { Container } from "react-bootstrap";
import { formatDateDiff } from "utils/misc";

export const UsersContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRow = (user: User, Cell: (props: any) => JSX.Element) => {
    return (
      <>
        <Cell>
          <Link to={`/admin/user/${user.id}`}>
            {user.first_name} {user.last_name}
          </Link>
        </Cell>
        <Cell>
          <Link to={`/admin/user/${user.id}`}>{user.email}</Link>
        </Cell>
        <Cell>
          <Link to={`/admin/user/${user.id}`}>
            {user.instances.length > 0 && user.instances.length}
          </Link>
        </Cell>
        <Cell>
          <Link to={`/admin/user/${user.id}`}>
            {formatDateDiff(user.created_at)}
          </Link>
        </Cell>
      </>
    );
  };

  return (
    <Container>
      <PageTitle className="pt-4" title="Users" />
      <TableMk2
        sourceUrl="/admin/user"
        cols={4}
        columns={["Name", "Email", "Instances", "Created"]}
        renderRow={renderRow}
      />
    </Container>
  );
};
