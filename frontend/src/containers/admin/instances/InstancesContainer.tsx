import { Container } from "react-bootstrap";

import { Link } from "components/Link";
import { Instance } from "interfaces/Instance";
import { TableMk2 } from "components/TableMk2";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "utils/misc";
import { setBreadcrumbs } from "redux/actions/AppActions";

export const InstancesContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          link: "/admin",
          text: "Dashboard",
        },
        {
          link: "/instance",
          text: "Instances",
        },
      ])
    );
  }, []);

  /**
   * Renders a single row in the table
   *
   * @param {Instance} instance
   * @returns {JSX.Element}
   */
  const renderRow = (
    instance: Instance,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cell: (props: any) => JSX.Element
  ): JSX.Element => {
    return (
      <>
        <Cell>
          <Link to={`/admin/instance/${instance.id}`}>
            <p>{instance.id.substring(0, 15)}...</p>
          </Link>
        </Cell>
        <Cell>
          <Link to={`/admin/game/${instance.image?.game?.id}`}>
            <p>{instance.image?.game?.name}</p>
          </Link>
        </Cell>
        <Cell>
          <p>{instance.port}</p>
        </Cell>
        <Cell></Cell>
        <Cell>
          <Link to={`/admin/user/${instance.user?.id}`}>
            <p>
              {instance.user?.first_name} {instance.user?.last_name}
            </p>
          </Link>
        </Cell>
        <Cell>
          <Link to={`/admin/agent/${instance.agent.id}`}>
            <p>{instance.agent.ip}</p>
          </Link>
        </Cell>
        <Cell>
          <p>{formatDate(instance.created_at)}</p>
        </Cell>
      </>
    );
  };

  return (
    <Container className="pt-3">
      <TableMk2
        cols={7}
        renderRow={renderRow}
        filterable={["Game", "User", "Agent"]}
        columns={["ID", "Game", "Ports", "Uptime", "User", "Agent", "Created"]}
        sourceUrl="/admin/instance"
      />
    </Container>
  );
};
