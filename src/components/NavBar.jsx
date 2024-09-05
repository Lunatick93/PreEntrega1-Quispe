import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from "./CartWidget";

export const NavBar = () => {
    return (

    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
  <Container>
    <Navbar.Brand href="/">NIKA Moto Indumentaria</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/category/campera">Camperas</Nav.Link>
        <Nav.Link as={NavLink} to="/category/casco">Cascos</Nav.Link>
        <Nav.Link as={NavLink} to="/category/guante">Guantes</Nav.Link>
        <Nav.Link as={NavLink} to="/category/bota">Botas</Nav.Link>
      </Nav>
      <CartWidget />
    </Navbar.Collapse>
  </Container>
</Navbar>
        

    );
};