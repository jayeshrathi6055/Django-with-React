import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function myNavbar() {
  return (
    <>
      <Navbar bg="dark" variant = "dark" expand="lg">
        <Container>
          <Navbar.Brand>Notes Saver</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto effect">
              <Link to="/" className = "mx-2" style = {{color:"white",textDecoration:"none"}}>Home</Link>
              <Link to="/about" style = {{color:"white",textDecoration:"none"}}>About</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
