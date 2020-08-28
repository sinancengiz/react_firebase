import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
import { Button, Col, Form } from 'react-bootstrap';

const SignUpPage = () => (
  <div className="forms" >
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  zipcode:'',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email,zipcode, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            zipcode,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
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
    const {
      username,
      email,
      zipcode,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <div >
       <Form onSubmit={this.onSubmit}>

      <Form.Group as={Col} controlId="formGridUserName">
          <Form.Control           
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="fromGridZipcode">
        <Form.Control           
            name="zipcode"
            value={zipcode}
            onChange={this.onChange}
            type="text"
            placeholder="Zip Code"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control           
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword1">
          <Form.Control           
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword2">
          <Form.Control           
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password" />
        </Form.Group>
 
     
      <Button variant="primary" disabled={isInvalid} type="submit">
        Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </Form>
    </div>

    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };