import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({firebase}) => {
    function signout(){
        firebase.doSignOut();
        window.location='/';
    }


    return ( 
        <button type='button' onClick={signout}>
            Sign Out
        </button>
    );
}
 
export default withFirebase(SignOutButton);