import firebase from 'firebase'; 
const firebaseConfig = {
    apiKey: "AIzaSyAAUDjz5zbhDVMRJ-3A6egHEsPJpNBB18Q",
    authDomain: "build-whatsapp-clone.firebaseapp.com",
    databaseURL: "https://build-whatsapp-clone.firebaseio.com",
    projectId: "build-whatsapp-clone",
    storageBucket: "build-whatsapp-clone.appspot.com",
    messagingSenderId: "1035773195439",
    appId: "1:1035773195439:web:984b619635a408ec04905a",
    measurementId: "G-X5Q21LFWNW"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;