import { Col, Container, Row } from "react-bootstrap";

import { LoginForm } from "components/LoginForm";
import { RegisterForm } from "components/RegisterForm";

export const LoginContainer = () => {
  return (
    <Container className="mt-4">
      <h3>Login to Continue</h3>
      <hr />
      <Row>
        <Col>
          <LoginForm />
        </Col>
        <Col>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};
