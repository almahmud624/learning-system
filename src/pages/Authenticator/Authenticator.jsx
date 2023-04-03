import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import {
  useCreateUserMutation,
  useLogInMutation,
} from "../../features/auth/authApi";
export const Authenticator = () => {
  const [
    createUser,
    {
      data: registerdUserData,
      isLoading: registrationLoading,
      error: registrationErr,
    },
  ] = useCreateUserMutation();
  const [
    login,
    { data: loggedUserData, isLoading: logInLoading, error: logInErr },
  ] = useLogInMutation();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // data response show dependency
  const data = registerdUserData || loggedUserData;
  const error = registrationErr || logInErr;
  const isLoading = registrationLoading || logInLoading;

  // form field display condition
  const { pathname } = useLocation();
  const isSignIn = pathname === "/" ? true : false;
  const isAdmin = pathname === "/admin" ? true : false;

  // getting user info
  const [userInfo, setUserInfo] = useState({});
  const gettingUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    // user registration
    if (!isSignIn) {
      if (userInfo.password === userInfo.confirmPassword) {
        const newUser = {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          role: "student",
        };
        createUser(newUser);
      } else {
        setErr("password do not match");
      }
    }

    // user sign in
    if (isSignIn || isAdmin) {
      login({ email: userInfo.email, password: userInfo.password });
    }
  };

  useEffect(() => {
    if (data?.accessToken && data?.user) navigate("/video/1");
    if (error?.data) setErr(error?.data);
  }, [data, error, navigate]);
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={logo} alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              {isSignIn
                ? "Sign in to Student Account"
                : isAdmin
                ? "Sign in to Admin Account"
                : "Create Your New Account"}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {!isSignIn && !isAdmin && (
                <div>
                  <label for="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autocomplete="name"
                    required
                    className="login-input rounded-t-md"
                    placeholder="Student Name"
                    onChange={(e) => gettingUserInfo(e)}
                  />
                </div>
              )}
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="login-input "
                  placeholder="Email address"
                  onChange={(e) => gettingUserInfo(e)}
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="login-input"
                  placeholder="Password"
                  onChange={(e) => gettingUserInfo(e)}
                />
              </div>
              {!isSignIn && !isAdmin && (
                <div>
                  <label for="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autocomplete="confirm-password"
                    required
                    className="login-input rounded-b-md"
                    placeholder="Confirm Password"
                    onChange={(e) => gettingUserInfo(e)}
                  />
                </div>
              )}
            </div>

            {isSignIn && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    to="/registration"
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    Create New Account
                  </Link>
                </div>
              </div>
            )}
            {isAdmin && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link
                    to="/registration"
                    className="font-medium text-violet-600 hover:text-violet-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${
                  isLoading ? "bg-violet-900" : "bg-violet-600"
                }`}
                disabled={isLoading}
              >
                {isSignIn || isAdmin ? "Sign in" : "Create Account"}
              </button>
            </div>
          </form>
          {err && (
            <div className="flex items-center justify-center py-3 bg-gray-900 mt-3 rounded-lg">
              <div className="text-sm">
                <span className="text-red-600 capitalize">{err}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
