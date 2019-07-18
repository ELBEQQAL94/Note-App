import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

require('firebase/firestore');
// Initialize Firebase
  firebase.initializeApp({
  apiKey: "AIzaSyAIHuKFVt69NRndzjVrojVp3FHaXDlazx4",
  authDomain: "evernote-77310.firebaseapp.com",
  databaseURL: "https://evernote-77310.firebaseio.com",
  projectId: "evernote-77310",
  storageBucket: "evernote-77310.appspot.com",
  messagingSenderId: "739152687229",
  appId: "1:739152687229:web:87f749d901f32e47"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
