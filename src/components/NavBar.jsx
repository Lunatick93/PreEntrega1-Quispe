import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from "./CartWidget";

export const NavBar = () => {
    return (

    <Navbar bg="secondary" expand="lg" data-bs-theme="dark">
  <Container>
    <Navbar.Brand href="/">NIKA</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/category/Campera">Camperas</Nav.Link>
        <Nav.Link as={NavLink} to="/category/Casco">Cascos</Nav.Link>
        <Nav.Link as={NavLink} to="/category/Guantes">Guantes</Nav.Link>
        <Nav.Link as={NavLink} to="/category/Botas">Botas</Nav.Link>
      </Nav>
      <CartWidget />
    </Navbar.Collapse>
  </Container>
</Navbar>

        

    );
};