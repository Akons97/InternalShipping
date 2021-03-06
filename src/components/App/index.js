import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import ShippingPage from '../Shipping';
import Shipments from '../Shipments';
import {withFirebase} from '../Firebase';

import * as ROUTES from '../../constants/routes'; 

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
        comp = Shipments;
        }
        else{
        comp = SignInPage;
        };
    
        return(
        <Router>
            <div>
            <Navigation authUser={this.state.authUser}/>
            <Route exact path={'/'} component={comp} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SHIPPING} component={ShippingPage} />
            <Route path={ROUTES.SHIPMENTS} component={Shipments} />
            </div>
        </Router>
);
}
}
 
export default withFirebase(App);