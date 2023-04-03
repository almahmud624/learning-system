import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userSignIn } from "../features/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);
  useEffect(() => {
    const auth = JSON.parse(localStorage?.getItem("auth"));
    if (auth?.token && auth?.user) {
      dispatch(userSignIn({ token: auth.token, user: auth.user }));
    }
    setAuthCheck(true);
  }, [dispatch]);
  return authCheck;
};
