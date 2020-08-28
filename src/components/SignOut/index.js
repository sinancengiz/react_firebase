import React from 'react';
import Button from 'react-bootstrap/Button';
 
import { withFirebase } from '../Firebase';

 
const SignOutButton = ({ firebase }) => (
  <div>
    <Button variant="primary" type="button" onClick={firebase.doSignOut} >Sign Out</Button>
  </div>
);
 
export default withFirebase(SignOutButton);