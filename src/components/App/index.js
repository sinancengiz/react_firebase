import React from 'react';
import { BrowserRouter as Router,   Route} from 'react-router-dom';
 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
 
import * as ROUTES from '../../constants/routes';
import { AuthUserContext, withAuthentication } from '../Session';

const App = () => (
  <AuthUserContext.Consumer>
  {authUser => (
      <Router>
        <div>
          <Navigation />
          
          <hr />
    
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

          <Route path={ROUTES.HOME} render={(props) => <HomePage{...props} authUser = {authUser}/>} />

          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    )}
    </AuthUserContext.Consumer>
  );
 
  export default withAuthentication(App);