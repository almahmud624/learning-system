import { useState } from "react";
import { app } from "../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userSignIn, userSignOut } from "../features/auth/authSlice";
const auth = getAuth(app);

export function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     const unsubscribe = auth().onAuthStateChanged((user) => {
  //       setUser(user);
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }, []);

  const signUpWithEmail = async ({ name, email, password, role }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user?.uid) {
        updateProfile(auth.currentUser, { displayName: name }).then(() => {
          // store user email role for check user
          dispatch(
            userSignIn({
              token: user?.accessToken,
              user: { name, email, role },
            })
          );
          // Persist the token in local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: user?.accessToken,
              user: { name, email, role },
            })
          );
        });
      }
    } catch (error) {
      setErr(error.code);
    }
  };

  const signInWithEmailPassword = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user?.uid) {
        if (user?.email === "admin@gmail.com") {
          // store user email role for check user
          dispatch(
            userSignIn({
              token: user?.accessToken,
              user: { name: user.displayName, email, role: "admin" },
            })
          );
          // Persist the token in local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: user?.accessToken,
              user: { name: user.displayName, email, role: "admin" },
            })
          );
        } else {
          // store user email role for check user
          dispatch(
            userSignIn({
              token: user?.accessToken,
              user: { name: user.displayName, email, role: "student" },
            })
          );
          // Persist the token in local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: user?.accessToken,
              user: { name: user.displayName, email, role: "student" },
            })
          );
        }
      }
    } catch (error) {
      setErr(error.code);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    dispatch(userSignOut());
    // Remove the token from local storage
    localStorage.removeItem("auth");
  };

  return {
    user,
    signUpWithEmail,
    logOut,
    err,
    setErr,
    signInWithEmailPassword,
  };
}
