
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9bZ0ualbB8-NSvXzIEhSHM0V4T2WRDxs",
    authDomain: "fun-chat-react.firebaseapp.com",
    projectId: "fun-chat-react",
    storageBucket: "fun-chat-react.appspot.com",
    messagingSenderId: "161199384121",
    appId: "1:161199384121:web:fa97da66598a49da124fe8",
    measurementId: "G-FP312Z0GH5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
auth.useEmulator('http://localhost:9099')
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080)
}
export { db, auth };
export default firebase;