import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDV7ymYACErm1U6Za_JcyuD7GKbl7F4JV0",
    authDomain: "prototype-team-10.firebaseapp.com",
    databaseURL: "https://prototype-team-10.firebaseio.com",
    projectId: "prototype-team-10",
    storageBucket: "prototype-team-10.appspot.com",
    messagingSenderId: "1064834305936",
    appId: "1:1064834305936:web:17052ada12086db071ed15"
  };

  class Firebase {
      constructor(){
          app.initializeApp(config);

          this.auth = app.auth();
          this.db = app.database();
      }

      // ** Auth API ***

      doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
      
      doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
      
      doSignOut = () => this.auth.signOut();

      doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

      doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

      // *** User API ***

      user = uid => this.db.ref(`users/${uid}`);

      users = () => this.db.ref('users');
  }

  export default Firebase;