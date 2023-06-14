"use client";
import { firebase_App } from "@/utils/firebase.init";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
export const authContext = createContext();

const UserCredential = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  // firebase auth
  const auth = getAuth(firebase_App);
  //singin with email and password
  const sinInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  // firebase auth provider with email and password
  const createUserwithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // logout current account
  const logoutFromAccount = () => signOut(auth);
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

  // to hold user state and update user sate
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      subscribe();
    };
  }, []);
  return (
    <>
      <authContext.Provider
        value={{
          isLoading,
          user,
          sinInWithEmail,
          createUserwithEmail,
          createUserWithGoogleAuthProvider,
          createUserWithGithubAuthProvider,
          emailVerification,
          passwordReste,
          updateUserProfile,
          logoutFromAccount,
        }}
      >
        {children}
      </authContext.Provider>
    </>
  );
};

export default UserCredential;
