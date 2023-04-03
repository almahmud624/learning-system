import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (auth?.token && auth?.user && auth?.user?.role === "student") {
    return children;
  }
  return <Navigate to="/" />;
};

export default PrivateRoute;
