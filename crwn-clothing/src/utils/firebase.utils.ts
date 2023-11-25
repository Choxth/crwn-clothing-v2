import { initializeApp } from 'firebase/app';

import { Category } from '../store/categories/category.types';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  UserCredential,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAT7B8dE-HkxQK1oznMXlT6ZZi-ftiM2hc",
  authDomain: "crwn-clothing-db-14117.firebaseapp.com",
  projectId: "crwn-clothing-db-14117",
  storageBucket: "crwn-clothing-db-14117.appspot.com",
  messagingSenderId: "767384189150",
  appId: "1:767384189150:web:2123978d2f7b33fda3ea4f"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = { 
  title: string; 
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise <void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};



// add the 'as Category' clause since we 'know' the data from the document is going to come back 
// as a Category object. or objects? 
export const getCategoriesAndDocuments = async ():Promise <Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as Category );
};

export type AdditionalInformation = {
  displayName? : string; 
}


// This particular structure is here, and not in user.types.ts, because it is more related to firebase data 
// than our own data. 
export type UserData = { 
  createdAt: Date; 
  displayName: string; 
  email: string; 
}


export const createUserDocumentFromAuth = async (
  userAuth : User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>>   => {
  if (!userAuth) return;

  // this is where it does that funny thing where I need to create a doc ref (already having a userId) 
  // and then use that to fetch the user record out of the dib. 
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    console.log('No existing user found, creating new:', additionalInformation)
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // this is the write to my db to save the user document 
      await setDoc(userDocRef, {
        displayName, 
        email, 
        createdAt,
        ...additionalInformation
      });

      // Catch here catches an unknown error. JS doesn't know what types of errors are possible, unlike Java. 
      // Unknown isn't castable to another 'known' type, so just log the whole error.
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email:string, password:string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


 // Dont need to type these functions since they're typed from firebase
export const signInAuthUserWithEmailAndPassword = async (email:string, password:string ): Promise<UserCredential|void> => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};



export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>)  => onAuthStateChanged(auth, callback);



  // check if there is a current logged in user. 
  export const getCurrentUser = (): Promise<User | null> => { 
    return new Promise( (resolve, reject) => { 

      const unsubscribe = onAuthStateChanged(auth,
        (userAuth) => { 
          unsubscribe();
          resolve(userAuth);
      }, 
      reject ); 

    });
  }