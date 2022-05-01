import toast from "react-hot-toast";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

import { api } from "utils/api";
import { SocketContext } from "App";
import { User } from "interfaces/User";
import { refetchUser } from "utils/user";

interface RegisterResponse {
  access_token: string;
}

export const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { openConnection } = useContext(SocketContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  /**
   * Invoked on form submit
   */
  const handleSubmit = async (): Promise<void> => {
    const request: Record<string, string> = {
      email,
      password,
      password_confirmation: confirmPassword,
      last_name: lastName,
      first_name: firstName,
    };

    const requiredFields: Record<string, string> = {
      email: "You must enter your email address",
      password: "You must enter a password",
      last_name: "You must enter your last name",
      first_name: "You must enter your first name",
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

    if (password !== confirmPassword) {
      toast.error("Your passwords must match!");
    }

    api
      .post<RegisterResponse>("/auth/register", request)
      .then(async (response) => {
        localStorage.setItem("token", response.data.access_token);
        await refetchUser(dispatch);
        history.push("/");
      })
      .catch(() => {
        // do something
      }); // TODO: better error message
  };

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              id="firstNameRegister"
              placeholder="First Name"
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastNameRegister"
              placeholder="Last Name"
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              id="emailRegister"
              placeholder="Enter Email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="passwordRegister"
              placeholder="Password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirmPasswordRegister"
              placeholder="Confirm Password"
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
          </Form.Group>
          <Button
            variant="primary"
            id="registerButton"
            onClick={() => handleSubmit()}
          >
            Register
          </Button>
        </Form>
      </Card.Body>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  background-color: var(--bg-secondary);
`;
