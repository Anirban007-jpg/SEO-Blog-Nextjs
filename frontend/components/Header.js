import { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { API_NAME } from '../config';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
          <Link href="/">
            <NavLink className="font-weight-bold">{API_NAME}</NavLink>
          </Link> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                 <Link href="/signin">
                    <NavLink>
                       <strong>
                          Login
                       </strong>
                    </NavLink>
                 </Link>
            </NavItem>
            <NavItem>
                 <Link href="/signup">
                    <NavLink>
                       <strong>
                          Register
                       </strong>
                    </NavLink>
                 </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;