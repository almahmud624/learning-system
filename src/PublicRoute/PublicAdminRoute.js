import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicAdminRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  if (auth?.token && auth?.user && auth?.user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }
  return children;
};

export default PublicAdminRoute;
