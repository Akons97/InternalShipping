import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import {AuthUserContext} from '../Session';
import {withFirebase} from '../Firebase';

import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';

let comp;
class App extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        authUser: null,
      };
    }
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? this.setState({ authUser })
              : this.setState({ authUser: null });
          },
        );
      }

    componentWillUnmount() {
        this.listener();
    }

    render(){
    if(this.state.authUser){
        comp = LandingPage;
        console.log(this.state.authUser);
        }
        else{
        comp = SignInPage;
        console.log(this.state.authUser);
        };
    
        return(
        <Router>
            <div>
            <Navigation authUser={this.state.authUser}/>
            <Route exact path={'/'} component={comp} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            </div>
        </Router>
);
}
}
 
export default withFirebase(App);