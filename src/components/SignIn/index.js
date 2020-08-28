import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Button, Col, Form } from 'react-bootstrap';
 
const SignInPage = () => (
  <div className="forms">
    <h3>SignIn with your Email and Password</h3>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <div >
      <Form onSubmit={this.onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control           
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address" />
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control           
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password" />
        </Form.Group>
      </Form.Row>
    
     
      <Button variant="primary" disabled={isInvalid} type="submit">
        Sign In
      </Button>
      {error && <p>{error.message}</p>}
    </Form>
    </div>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };