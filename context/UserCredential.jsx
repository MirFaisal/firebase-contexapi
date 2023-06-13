"use client";
import { firebase_App } from "@/utils/firebase.init";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { createContext } from "react";

export const authContext = createContext();
const UserCredential = ({ children }) => {
  // firebase auth
  const auth = getAuth(firebase_App);
  //singin with email and password
  const sinInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  // firebase auth provider with email and password
  const createUserwithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  //create user with google auth provider
  const googleProvider = new GoogleAuthProvider();
  const createUserWithGoogleAuthProvider = () =>
    signInWithPopup(auth, googleProvider);

  // create user with github auth provider
  const githubProvider = new GithubAuthProvider();
  const createUserWithGithubAuthProvider = () =>
    signInWithPopup(auth, githubProvider);

  //send email for verification
  const emailVerification = () => sendEmailVerification(auth.currentUser);

  // send password reset
  const passwordReste = (email) => sendPasswordResetEmail(auth, email);

  // update profile
  const updateUserProfile = (userInfo) =>
    updateProfile(auth.currentUser, userInfo);

  return (
    <>
      <authContext.Provider
        value={{
          sinInWithEmail,
          createUserwithEmail,
          createUserWithGoogleAuthProvider,
          createUserWithGithubAuthProvider,
          emailVerification,
          passwordReste,
          updateUserProfile,
        }}
      >
        {children}
      </authContext.Provider>
    </>
  );
};

export default UserCredential;
