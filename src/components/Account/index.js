import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

import { Button, Col, Form } from 'react-bootstrap';
 
class AccountPage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      zipcode: "",
      userid: "",
      error: null,
    };
  }
 
  onSubmit = (event, userid) => {
    const { zipcode } = this.state;

    this.props.firebase
          .user(userid)
          .update({
            zipcode:zipcode
          }).then(authUser => {
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
 
    event.preventDefault();
 
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { zipcode,error } = this.state;

    const isInvalid = zipcode === '';

    return (
      <AuthUserContext.Consumer>
      {authUser => (
      <div className="forms">
        <h1>Current User: {authUser.email}</h1>
        <br></br>
        <h2>Reset Your Password with Email</h2>
        <PasswordForgetForm />
        <br></br>
        <h2>Create New Password</h2>
        <PasswordChangeForm />
        <br></br>
        <h1>Change Zipcode</h1>
        <Form onSubmit={(event) => this.onSubmit(event, authUser.uid)}>
            <Form.Group as={Col} controlId="fromGridZipcode">
            <Form.Control           
                name="zipcode"
                value={zipcode}
                onChange={this.onChange}
                type="text"
                placeholder="Zip Code"/>
            </Form.Group>

          <Button variant="primary" disabled={isInvalid} type="submit">
            Change Zipcode
          </Button>
          {error && <p>{error.message}</p>}
          </Form>
      </div>
      )}
    
      </AuthUserContext.Consumer>
    );
  }
}
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);