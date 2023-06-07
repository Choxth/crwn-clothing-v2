import { initializeApp } from 'firebase/app'; 

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  FacebookAuthProvider , 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'

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
  const googleProvider = new GoogleAuthProvider(); 
  const facebookProvider = new FacebookAuthProvider(); 


  googleProvider.setCustomParameters( { 
    prompt: 'select_account' 
  }); 

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();



  /**
   * Fetches a userDocRef object from the authentication chain, either from a new registered google user 
   * who has not used the application before, or one who has already gone through the process. 
   * If the user returned does not exist, we create it with setDoc 
   * In either event, we return the database document descriptor for the user
   */
  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {} ) => { 

    if (!userAuth) { 
      console.error("missing userAuth in createUserDocFromAuth "); 
      throw new Error("Exception");
    }

    const  userDocRef = doc(db, 'users',  userAuth.uid);  // a doc descriptor that points to the user 
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

        await setDoc( 
          userDocRef, { 
            displayName, 
            email, 
            createdAt, 
          ...additionalInformation
         } ); 

      }catch (e) { 

        console.log('Error creating user:', e);
      }
    } 

    // userDocRef has some shit in it, primarily an id, but other oo, goog stuff. 

    console.log('userDocRef', userDocRef);
    return userDocRef; 
  
  }

  // the instructor has these functions within this utils module to separate the concerns with regards to 
  // potentially several front end modules and the libraries he's working with. This function is 
  // specific to firebase, so this keeps firebase out of his front end code in this single utils module
  export const createAuthUserWithEmailAndPassword = async (email, password) => { 

    if (!email || !password) return; 

    return await createUserWithEmailAndPassword(auth, email, password);

  }

  export const loginInWithEmailAndPassword = async (email, password) => { 

    if (!email || !password) return; 
    return await signInWithEmailAndPassword(auth, email, password);
  } 

    
  export const signOutUser = async () => { 
    console.log('SignOutUser called'); 
    console.log(new Error().stack);
    await signOut(auth); 
  } 


  export const onAuthStateChangedListener = (callback) => 
      onAuthStateChanged(auth, callback ); 
