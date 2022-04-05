import { Button } from "components/Button";
import { Grid } from "components/Grid";
import { PageTitle } from "components/PageTitle";
import { User } from "interfaces/User";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import styled from "styled-components";
import { api } from "utils/api";

export const AccountSettingsContainer = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  /**
   * Invoked on details form submit
   */
  const handleDetailsChange = () => {
    const request = {
      firstName,
      lastName,
      emailAddress,
    };

    api
      .post("/user/account/details", request)
      .then(() => {
        toast.success("Account details updated!");
      })
      .catch(() => {
        toast.error("Couldn't update account details");
      });
  };

  /**
   * Invoked on password form submit
   */
  const handlePasswordChange = () => {
    const request = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    api
      .post("/user/account/password", request)
      .then(() => {
        toast.success("Account password updated!");
      })
      .catch(() => {
        toast.error("Couldn't update account password");
      });
  };

  useEffect(() => {
    api.get<User>("/user/account").then((response) => {
      const user = response.data;
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmailAddress(user.email);
    });
  }, []);

  return (
    <Container>
      <PageTitle title="Account Settings" className="pt-4" />
      <Grid columns={2} gap="0 4rem">
        <StyledGrouping>
          <Form>
            <h5>My Details</h5>
            <Form.Group as={Row} className="mb-3" controlId="firstName">
              <Form.Label column sm={3}>
                First Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Form.Label column sm={3}>
                Last Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="emailAddress">
              <Form.Label column sm={3}>
                Email Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="emailAddress"
                  value={emailAddress}
                  onChange={(event) =>
                    setEmailAddress(event.currentTarget.value)
                  }
                />
              </Col>
            </Form.Group>
            <Button onClick={handleDetailsChange}>Submit</Button>
          </Form>
        </StyledGrouping>
        <StyledGrouping>
          <Form>
            <h5>Change Password</h5>
            <Form.Group as={Row} className="mb-3" controlId="currentPassword">
              <Form.Label column sm={3}>
                Current Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(event.currentTarget.value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="newPassword">
              <Form.Label column sm={3}>
                New Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.currentTarget.value)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
              <Form.Label column sm={3}>
                Confirm Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.currentTarget.value)
                  }
                />
              </Col>
            </Form.Group>
            <Button onClick={handlePasswordChange}>Submit</Button>
          </Form>
        </StyledGrouping>
      </Grid>
    </Container>
  );
};

const StyledGrouping = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
