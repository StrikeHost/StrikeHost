import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";

import { api } from "utils/api";
import { refetchUser } from "utils/user";

interface LoginResponse {
  access_token: string;
}

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /**
   * Invoked on form submission
   */
  const handleSubmit = async (): Promise<void> => {
    const request: Record<string, string> = {
      email: username,
      password,
    };

    const requiredFields: Record<string, string> = {
      email: "You must enter your email address",
      password: "You must enter a password",
    };

    if (
      Object.keys(requiredFields).some((value) => {
        if (!request[value]) {
          toast.error(requiredFields[value]);
          return true;
        }

        return false;
      })
    ) {
      return;
    }

    api
      .post<LoginResponse>("/auth/login", request)
      .then(async (response) => {
        localStorage.setItem("token", response.data.access_token);
        await refetchUser(dispatch);
        history.push("/");
      })
      .catch(() => {
        // TODO: better error message
      });
  };

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              id="emailLogin"
              placeholder="Enter Email"
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="password"
              id="passwordLogin"
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} id="loginButton">
            Login
          </Button>
        </Form>
      </Card.Body>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background-color: var(--bg-secondary);
`;
