import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, FormControl, Button, Nav, NavDropdown, Navbar } from "react-bootstrap";

class Navigation extends Component {

  render() {
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href="#tree">Famille De La Salle</Navbar.Brand> */}
          <h3>Famille De La Salle</h3>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#tree">Family Tree</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#timelinepage">Timeline</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </nav>
    )
  }
}

export default Navigation
