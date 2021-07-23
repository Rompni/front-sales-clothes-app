import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBTzcHlR4lrof079SvIaYD8sQ2h669FAbI",
    authDomain: "database-test-7d2b7.firebaseapp.com",
    databaseURL: "https://database-test-7d2b7-default-rtdb.firebaseio.com",
    projectId: "database-test-7d2b7",
    storageBucket: "database-test-7d2b7.appspot.com",
    messagingSenderId: "999816806821",
    appId: "1:999816806821:web:f3e349fa194850fd59684c"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
  

  //Firebase con el servicio de correo electronico
var uiConfig = {
  signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
};

export const auth = firebase.auth();//autenticacion
export const db = firebase.firestore();//base de datos
export const autorization = firebase.auth;
