import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDXkpeheA9YAnnf4UF9id7bTlTxsitWMtM",
    authDomain: "sinan-firebase-app.firebaseapp.com",
    databaseURL: "https://sinan-firebase-app.firebaseio.com",
    projectId: "sinan-firebase-app",
    storageBucket: "sinan-firebase-app.appspot.com",
    messagingSenderId: "613535278252",
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
      
    }

      // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

      // *** User API ***
 
    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');

  }
   
  export default Firebase;