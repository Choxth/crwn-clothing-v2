
import { createAction } from '../../utils/reducer/reducer.utils.js'
import { USER_ACTION_TYPES } from './user.types'

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)  // { type, payload} 


/* need new action creators for our action types 
SET_CURRENT_USER : 'user/SET_CURRENT_USER', 
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION', 
GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START', 
EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START', 
SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS', // all sign in operations eventually go through the one 
                                        // operation of fetching a user document from auth
SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE'
*/
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    { email, password });

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user); 

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const emailSignUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START,
    { email, password, displayName });

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, 
    {email, password, displayName});

    // this action is not handled by the reducers. It's not for the reducers, it's meant to be handled by 
    // the saga to trigger the signIn part later. Signing up doesn't create any 
export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, 
    {user, additionalDetails} ); 

export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START); 

export const signOutSuccess = () => createAction (USER_ACTION_TYPES.SIGN_OUT_SUCCESS); 
export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);    