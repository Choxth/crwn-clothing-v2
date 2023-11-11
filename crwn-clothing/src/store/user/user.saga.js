import { takeLatest, put, all, call } from 'redux-saga/effects'; 

import { USER_ACTION_TYPES } from './user.types';

import { 
    signInSuccess, 
    signInFailed, 
    signUpSuccess, 
    signUpFailed, 
    signOutSuccess, 
    signOutFailed
 } from './user.action';

import { 
    getCurrentUser, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    loginInWithEmailAndPassword,
    createAuthUserWithEmailAndPassword, 
    signOutUser
} from '../../utils/firebase.utils'

// This can be thought of as listening for the CHECK_USER_SESSION action
export function* onCheckUserSession() { 
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogle() { 
    try { 

        // I might have a slight mismatch here since Firebase has changed the return structure shape, it 
        // looks like. 
        const {user} = yield call (signInWithGooglePopup); 
        yield call(getSnapshotFromUserAuth, user); 

    } catch (error) { 

        yield put (signInFailed (error) );

    }
}

// This saga business is kinda like my event system I use in my application. It's a way of getting stuff 
// around the app without having to try to architect that from just using contexts, which I don't think would 
// work very well for this sort of thin        yield put( signUpSuccess(user, { displayName, email}) );
// nsider moving my savegame and hint structure to this type of more formally 
// discussed 



// destructuring 'payload' off the action 
export function* signInWithEmail({payload}) { 
    console.log('------> payload == ' , payload);
    const { email, password } = payload; 
    try { 

        const {user} = yield call(loginInWithEmailAndPassword, email, password)
        yield call (getSnapshotFromUserAuth, user)

    } catch (error) {
        yield put(signInFailed(error)); 
    }

}
export function* getSnapshotFromUserAuth( userAuth, additionalDetails ) { 
    try { 

        // if I'm understanding this atm, userSnapshot will be logged, but isn't being yielded 
        // at this point
        console.log('+++ with userAuth: ', userAuth, 'and deets:', additionalDetails);
        const userSnapshot = yield call( createUserDocumentFromAuth, userAuth, additionalDetails);

        console.log('==+++ userSnapshot', userSnapshot); 
        // console.log('UserSnapshot.data', userSnapshot);
        yield put (signInSuccess( { 
            id: userSnapshot.id,
            ...userSnapshot.data()
             }))

    } catch (error) { 
        yield put (signInFailed(error))

    }
}

export function* onGoogleSignInStart() { 
    yield takeLatest( USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() { 
    console.log('Got email sign in start');
    yield takeLatest( USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() { 
    try { 

        // Going to call the getCurrentUser method in this promisified form. If userAuth is 
        // non null, this function will yield* the value of getSnapshotFromUserAuth
        const userAuth = yield call (getCurrentUser); 
        if (!userAuth) return; 

        yield call (getSnapshotFromUserAuth, userAuth ); 
    } catch (error) {

    }
}

export function* signUp({payload }) {
    console.log('Ola signUp')
    const { email, password, displayName} = payload;
    try  {
        const { user } = yield call (createAuthUserWithEmailAndPassword, email, password);
        console.log('Ola signUpSuccess: ', user);
        yield put( signUpSuccess(user, { displayName, email}) );
    } catch (error) {
        yield put (signUpFailed(error)); 
    }
}

export function* onSignOut(){ 
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* signOut() {
   
    try  {
        yield   call(signOutUser); 
        yield   put(signOutSuccess())    
    } catch (error) {
        yield put (signOutFailed(error)); 
    }
}


export function* signInAfterSignUp({payload: { user, additionalDetails }}) {
    yield call( getSnapshotFromUserAuth, user, additionalDetails);
}


export function* onSignOutStart() { 
    yield takeLatest (USER_ACTION_TYPES.SIGN_OUT_START, signOut); 
}

export function* onSignUpStart() { 
    yield takeLatest (USER_ACTION_TYPES.SIGN_UP_START, signUp); 
}


export function* onSignUpSuccess() { 
    yield takeLatest( USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp); 
}


export function* userSagas() { 
    yield all([
        call ( onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess), 
        call(onSignOutStart)        
    ])
}