import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config.js";
import { toast } from "react-toastify";

const AuthContext = createContext({
  currentUser: null,
  registerUser: async (email, password) => {},
  loginUser: async (email, password) => {},
  signInUsingGoogle: async () => {},
  signOutUser: async () => {},
  loading: true,
});

const googleProvider = new GoogleAuthProvider();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register functionality
  async function registerUser(email, password) {
    console.log("inner registerUser");
    try {
      console.log("inner try catch");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  }

  // login function
  async function loginUser(email, password) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredentials) {
        return null;
      }
      return userCredentials.user;
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        toast.error("Email or password doesn't match.");
      } else {
        toast.error(error.message);
      }

      console.log("Error in logging in user:", error.message);
      console.log(error.code);
      throw error;
    }
  }

  // using google Authentication
  async function signInUsingGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user:", user);
      return user;
    } catch (error) {
      console.log("Error in signing in user using google:", error.message);
    }
    throw error;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);

      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email: email,
          username:displayName || email.split("@")[0],
          photo: photoURL,
        };
        setCurrentUser(userData);
      }
    });
    return () => unsubscribe();
    // unsubscribe on unmount
  }, []);

  async function signOutUser() {
    try {
      await signOut(auth);
      toast.success("User logged out successfully");
    } catch (error) {
      console.log("Error in logging out user:", error.message);
      toast.error("Error in logging out user");
    }
  }

  const authContextValue = {
    currentUser,
    registerUser,
    loginUser,
    signInUsingGoogle,
    signOutUser,
    loading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
