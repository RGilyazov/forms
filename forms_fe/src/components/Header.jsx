import React from "react";
import { Navbar, Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";

function Header() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Form APP</NavbarBrand>
      <Nav className="ml-auto flex-grow-1" navbar>
        <NavItem>
          <NavLink href="/">Templates</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/data">Data</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;
