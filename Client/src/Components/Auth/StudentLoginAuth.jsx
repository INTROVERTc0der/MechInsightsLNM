import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const StudentLoginAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.studentauth);
  return !isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default StudentLoginAuth;
