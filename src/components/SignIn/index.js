import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

import logo from './../../img/bologo.png';

const SignInPage = () => (
    <div>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends Component {
    constructor(props){
        super(props);

        this.state = {...INITIAL_STATE};
    }

onSubmit = event => {
    const {email, password } = this.state;

    this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.SHIPMENTS);
        })
        .catch(error => {
            this.setState({error});
        });

    event.preventDefault();
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render(){
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return(
            <div className="formContainer">
                <form className='loginPage mx-auto' onSubmit={this.onSubmit}>
                <img className='logo' src={logo} alt='logo'/>
                <div className="form-group">
                    <input name='email' type="email" value={email} onChange={this.onChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <input name="password" value={password} onChange={this.onChange} type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div className="form-group text-center">
                    <button disabled={isInvalid} type='submit' className='btn btn-black'>
                        Sign In
                    </button>
                </div>
                    {error && <p className="red">{error.message}</p>}
                </form>  
                </div> 
        );
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export {SignInForm};