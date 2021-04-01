
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCwNn_xqArV5xDULCiB-bDtXTjM_5B89qo",
    authDomain: "crwn-db-700f7.firebaseapp.com",
    projectId: "crwn-db-700f7",
    storageBucket: "crwn-db-700f7.appspot.com",
    messagingSenderId: "920385074088",
    appId: "1:920385074088:web:76e7f98dade609904be39d"
  };

  export const createUserProfileDocument = async (userAuth, additioanalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if (!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additioanalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;