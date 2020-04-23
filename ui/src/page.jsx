/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import {
  Nav, NavItem,
  Navbar, Grid,
  Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './contents.jsx';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Header>
        <Navbar.Brand>Product Tracker</Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/products">
            <NavItem>Product List</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
function Footer() {
  return (
    <small>
      <p className="text-center">
        <Glyphicon glyph="copyright-mark" />
        <br />
        ROMIL SHAH
        <br />
        <a href="https://github.com/romilshah98/Assignment_6" target="blank">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}
