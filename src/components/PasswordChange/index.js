import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';

import { Button, Col, Form } from 'react-bootstrap';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
       <Form onSubmit={this.onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPassword1">
          <Form.Control           
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password" />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridPassword2">
          <Form.Control           
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password" />
        </Form.Group>
      </Form.Row>
    
     
      <Button variant="primary" disabled={isInvalid} type="submit">
          Reset My Password
      </Button>
      {error && <p>{error.message}</p>}
    </Form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);