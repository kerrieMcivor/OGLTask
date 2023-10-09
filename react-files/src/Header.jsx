import './Header.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header mb-4">
      <Navbar expand="lg" bg="light" data-bs-theme="light" sticky="top">
      <Container>
        <Navbar.Brand href="/"><img src='./logo.png' alt="OGL Logo"></img></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Item  className="mt-2 mx-2"><Link to="/" style={{textDecoration: 'none', color: 'black'}}>All Products</Link></Nav.Item>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/glueguns" style={{textDecoration: 'none', color: 'black'}}>Glue Guns</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/handtools" style={{textDecoration: 'none', color: 'black'}}>Hand Tools</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/saws" style={{textDecoration: 'none', color: 'black'}}>Saws</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/drills" style={{textDecoration: 'none', color: 'black'}}>Drills</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/torches" style={{textDecoration: 'none', color: 'black'}}>Torches</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/sandpaper" style={{textDecoration: 'none', color: 'black'}}>Sandpaper</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;
