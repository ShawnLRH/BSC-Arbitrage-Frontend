// Import resources
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// Import custom files
import Logo from "../assets/logo.png";

// Component
function Header() {
  // Return component
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          {/** Brand */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={Logo}
              className="d-inline-block align-top logo"
              alt="logo"
            />
          </Navbar.Brand>

          {/** Toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/** Collapse */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/** Links */}
            <Nav className="ms-auto">
              {/** Home */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

// Export
export default Header;
