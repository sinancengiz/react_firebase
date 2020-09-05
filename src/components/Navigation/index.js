import React from 'react';
import { Link} from 'react-router-dom';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import {  Navbar, Nav,  Form } from 'react-bootstrap';
 
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Firebase</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
      <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
      {!!authUser.roles[ROLES.ADMIN] && (<Nav.Link as={Link} to={ROUTES.ADMIN}>Admin</Nav.Link>)}
    </Nav>
    <Form inline>
      <SignOutButton />
    </Form>
  </Navbar>
   </div>
);
 
const NavigationNonAuth = () => (

  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Firebase</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
    </Nav>
    <Form inline>
      <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
    </Form>
  </Navbar>

);
 
export default Navigation;