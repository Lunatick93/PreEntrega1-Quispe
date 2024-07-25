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
            <Nav.Link href="#home">Camperas</Nav.Link>
            <Nav.Link href="#features">Botas</Nav.Link>
            <Nav.Link href="#pricing">Guantes</Nav.Link>
            <Nav.Link href="#cascos">Cascos</Nav.Link>
          </Nav>
          <CartWidget />
        </Container>
      </Navbar>
        

    );
};