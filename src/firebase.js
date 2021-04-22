import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCh2TTMSOJaqU-896Sh_str1Ef4suInoTw",
    authDomain: "todoscompranweb.firebaseapp.com",
    projectId: "todoscompranweb",
    storageBucket: "todoscompranweb.appspot.com",
    messagingSenderId: "1037368242006",
    appId: "1:1037368242006:web:6ebb745afcd14b84fe70f7"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}