import { Col, Nav, Row, Tab } from "react-bootstrap";

export interface TabbedContainerProps {
  id: string;
  titles: string[];
  children: JSX.Element[];
}

export const TabbedContainer = ({
  id,
  titles,
  children,
}: TabbedContainerProps) => {
  return (
    <Tab.Container id={id} defaultActiveKey="0">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {titles.map((title, index) => (
              <Nav.Item key={index}>
                <Nav.Link eventKey={String(index)}>{title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {children.map((child, index) => (
              <Tab.Pane eventKey={String(index)} key={index}>
                {child}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
