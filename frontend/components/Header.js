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
import Router from 'next/router';
import { isAuth, signout } from '../actions/auth';

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
          {!isAuth() && (
            <>
                <NavItem>
                 <Link href="/signin">
                    <NavLink  style={{cursor: 'pointer'}}>
                       <strong>
                          Login
                       </strong>
                    </NavLink>
                 </Link>
              </NavItem>
              <NavItem>
                  <Link href="/signup">
                      <NavLink style={{cursor: 'pointer'}}>
                        <strong>
                            Register
                        </strong>
                      </NavLink>
                  </Link>
              </NavItem>
            </>
          )}
            {isAuth() && ( 
                <>
                  <NavItem>
                      <NavLink onClick={() => signout(() => Router.push('/signin'))} style={{cursor: 'pointer'}}>
                        <strong>
                            Logout
                        </strong>
                      </NavLink>
                  </NavItem>
                </>
              )
            }
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;