import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
class Header extends Component {
  render() {
    return (
/* collapseOnSelect means that at mobile it will be shown as icon that contains the links */
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Navbar.Brand href="/webapp">React ROS Robot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Means go to Website when press logout */}
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default Header;
