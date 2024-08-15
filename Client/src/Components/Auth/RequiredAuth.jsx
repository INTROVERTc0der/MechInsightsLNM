import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  //const { isLoggedIn, role } = useSelector((state) => state.facultlyauth);
  const isLoggedIn=localStorage.getItem("isLoggedIn");
  const role=localStorage.getItem("role");
  const location = useLocation();

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login/facultyLogin"} state={{ from: location }} replace />
  );
};

export default RequireAuth;


