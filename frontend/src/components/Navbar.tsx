import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  Navbar as BNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";

import { logout } from "utils/user";
import { PRODUCT_NAME } from "constants/AppConstants";
import { RootState } from "redux/reducers/RootReducer";
import { UserState } from "redux/reducers/UserReducer";
import styled from "styled-components";

const mapStateToProps = (state: RootState): UserState => ({
  ...state.userState,
});

export const Navbar = connect(mapStateToProps)(
  ({ is_authorised, user }: UserState) => {
    const dispatch = useDispatch();

    /**
     * Invoked on logout click
     *
     * @returns {Promise<void>}
     */
    const handleLogoutClick = async (): Promise<void> => {
      await logout(dispatch);
    };

    return (
      <StyledNavbar variant="dark" expand="lg" id="navbar">
        <Container>
          <BNavbar.Brand href="#home">{PRODUCT_NAME}</BNavbar.Brand>
          <BNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user?.admin && (
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              {!is_authorised && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              {is_authorised && (
                <NavDropdown title={user?.first_name} id="account-dropdown">
                  <NavDropdown.Item as={Link} to="/account">
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogoutClick}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </BNavbar.Collapse>
        </Container>
      </StyledNavbar>
    );
  }
);

const StyledNavbar = styled(BNavbar)`
  background-color: var(--bg-secondary);
`;
