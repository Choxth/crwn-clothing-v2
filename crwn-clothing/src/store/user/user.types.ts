export enum USER_ACTION_TYPES { 

    SET_CURRENT_USER = 'user/SET_CURRENT_USER', 
    CHECK_USER_SESSION = 'user/CHECK_USER_SESSION', 
    GOOGLE_SIGN_IN_START = 'user/GOOGLE_SIGN_IN_START', 
    EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START', 
    SIGN_OUT_START = 'user/GOOGLE_SIGN_OUT_START', 
    SIGN_OUT_SUCCESS = 'user/GOOGLE_SIGN_OUT_SUCCESS', 

    SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS', // all sign in operations eventually go through the one 
                                            // operation of fetching a user document from auth
    SIGN_IN_FAILED = 'user/SIGN_IN_FAILED', 
    SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED', 

    SIGN_UP_START = 'user/SIGN_UP_START', 
    SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS', 
    SIGN_UP_FAILED = 'user/SIGN_UP_FAILED'
}
