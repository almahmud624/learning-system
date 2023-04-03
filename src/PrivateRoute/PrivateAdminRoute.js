import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (auth?.token && auth?.user && auth?.user?.role === "admin") {
    return children;
  }
  return <Navigate to="/admin" />;
};

export default PrivateAdminRoute;
