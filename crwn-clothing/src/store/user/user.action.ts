
import { 
    createAction, 
    Action, 
    ActionWithPayload, 
    withMatcher
   } from '../../utils/reducer/reducer.utils';

import { USER_ACTION_TYPES} from './user.types'

import { AdditionalInformation, UserData } from '../../utils/firebase.utils';
import { User } from 'firebase/auth';

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));   // { type, payload} 


/* need new action creators for our action types 
SET_CURRENT_USER : 'user/SET_CURRENT_USER', 
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION', 
GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START', 
EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START', 
SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS', // all sign in operations eventually go through the one 
                                        // operation of fetching a user document from auth
SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE'
*/

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION> 
export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData> 

// here, we're defining the type inline, not having a type defined somewhere else. Cheating! 
export type EmailSignInStart = ActionWithPayload<
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START, 
    {email: string, password: string}
>; 
// export type EmailSignUpStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, UserData> 

export type SignInSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_IN_SUCCESS, 
    UserData
>;

export type SignInFailed = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_IN_FAILED, 
    Error
>; 

export type SignUpStart = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_START, 
    {email: string, password: string, displayName: string}
>; 

export type SignUpSuccess = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_SUCCESS, 
    { user: User, additionalDetails: AdditionalInformation} 
>; 

export type SignUpFailed = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_UP_FAILED, 
    Error
>; 

export type SignOutStart = Action<
    USER_ACTION_TYPES.SIGN_OUT_START
>; 

export type SignOutSuccess = Action<
    USER_ACTION_TYPES.SIGN_OUT_SUCCESS
>; 


export type SignOutFailed = ActionWithPayload<
    USER_ACTION_TYPES.SIGN_OUT_FAILED, 
    Error
>; 

export const checkUserSession = withMatcher(
    ():CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
    ():GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
    (email:string, password:string):EmailSignInStart => 
              createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{ email, password })
);

export const signInSuccess = withMatcher(
    (user:UserData & {id: string} ):SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
); 

export const signInFailed = withMatcher(
    (error:Error):SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signUpStart = withMatcher(
    (email:string, password:string, displayName:string): SignUpStart => 
                           createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName})
);

    // this action is not handled by the reducers. It's not for the reducers, it's meant to be handled by 
    // the saga to trigger the signIn part later. Signing up doesn't create any 
export const signUpSuccess = withMatcher(
    (user:User, additionalDetails: AdditionalInformation):SignUpSuccess => 
            createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalDetails} )
); 

export const signUpFailed = withMatcher(
    (error:Error):SignUpFailed => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export const signOutStart = withMatcher(
    ():SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
); 

export const signOutSuccess = withMatcher(
    (): SignOutSuccess => createAction (USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
); 

export const signOutFailed = withMatcher(
    (error: Error):SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);    