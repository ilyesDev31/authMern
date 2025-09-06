import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useGetMeQuery, useLogoutMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
const Header = () => {
  const { data, isFetching, isLoading, error } = useGetMeQuery();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await logout().unwrap();
      location.pathname = "/";
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  if (isLoading || isFetching) return <h1>Loading...</h1>;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Mern App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {data?.user ? (
              <>
                <NavDropdown title={data.user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
