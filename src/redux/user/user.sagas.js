import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";
import { userActionTypes } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapShot = yield userRef.get()
        yield put(signInSuccess({id: userSnapShot.id, ...userSnapShot.data()}))
    } catch(error) {
        yield put(signInFailure(error))
    }
}

/* ------- Sign in with google */

function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSigninStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}
/* ------- Sign in with email */
function* signInWithEmail({payload: {email, password}}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSigninStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser()
        if(!userAuth) return 
        yield getSnapshotFromUserAuth(userAuth)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signout() {
    try{
        yield auth.signOut()
        yield put(signOutSuccess()) 
    } catch(error) {
        yield put(signOutFailure(error)) 
    }   
    
}

export function* onSignoutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signout)
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(
            email,
            password
        )
        yield put(signUpSuccess({user, additionalData: {displayName}}))
    } catch(error) {
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSigninStart), 
        call(onEmailSigninStart), 
        call(onCheckUserSession), 
        call(onSignoutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}