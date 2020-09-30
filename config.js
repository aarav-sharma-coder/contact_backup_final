import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyCllPTtgyhtJGhKkvkRCQxjl2hFUiDn3F4",
    authDomain: "contact-backup-app-68212.firebaseapp.com",
    databaseURL: "https://contact-backup-app-68212.firebaseio.com",
    projectId: "contact-backup-app-68212",
    storageBucket: "contact-backup-app-68212.appspot.com",
    messagingSenderId: "1000413685585",
    appId: "1:1000413685585:web:c473cd41271c50054f1570"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();