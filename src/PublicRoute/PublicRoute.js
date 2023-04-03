import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (auth?.token && auth?.user && auth?.user?.role === "student") {
    return <Navigate to="/video/1" />;
  }
  return children;
};

export default PublicRoute;
