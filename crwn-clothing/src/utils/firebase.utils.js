import { initializeApp } from 'firebase/app'; 

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import {
  getFirestore, doc, getDoc, setDoc 
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAT7B8dE-HkxQK1oznMXlT6ZZi-ftiM2hc",
    authDomain: "crwn-clothing-db-14117.firebaseapp.com",
    projectId: "crwn-clothing-db-14117",
    storageBucket: "crwn-clothing-db-14117.appspot.com",
    messagingSenderId: "767384189150",
    appId: "1:767384189150:web:2123978d2f7b33fda3ea4f"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider(); 


  provider.setCustomParameters( { 
    prompt: 'select_account' 
  }); 

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) => { 


    const  userDocRef = doc(db, 'users',  userAuth.uid); 
    const userSnapshot = await getDoc(userDocRef)

    // This is the way of handling the passport interaction. Remember there, we got from facebook an 
    // eventual callback with the user firstname/lastname and we did nothing with it. That  was the end of the exp. 

    // This is kind of slick, no more creating user pages, no more creating collections even to hold them 
    // we go directly to storing users into a collection that gets created when the first user is registered

    // I should see what the username/password invocation is like. It should be similar


    // here though, we are given an object 
    if (!userSnapshot.exists() ) { 

      const { displayName, email } = userAuth; 
      const createdAt = new Date();

      // no notion of collections here. 
      try { 

        await setDoc( userDocRef,{ displayName, email, createdAt } ); 

      }catch (e) { 

        console.log('Error creating user:', e);
      }
    } 

    // userDocRef has some shit in it, primarily an id, but other oo, goog stuff. 

    console.log('userDocRef', userDocRef);
    return userDocRef; 
  




    // check if userData exists 
      // return userData 

    // else 

    // create/set the document with the data from the usrAuth call in my collection

  }