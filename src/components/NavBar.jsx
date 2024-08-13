import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CartWidget } from "./CartWidget";

export const NavBar = () => {
    return (

    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">NIKA Moto Indumentaria</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">home</Nav.Link>
            <Nav.Link as={NavLink} to="/category/campera">Camperas</Nav.Link>
            <Nav.Link as={NavLink} to="/category/casco">Cascos</Nav.Link>
            <Nav.Link as={NavLink} to="/category/guante">Guantes</Nav.Link>
            <Nav.Link as={NavLink} to="/category/bota">Botas</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
        

    );
};