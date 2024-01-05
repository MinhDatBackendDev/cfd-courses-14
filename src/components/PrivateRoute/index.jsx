import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import tokenMethod from "@/utils/token";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { handleShowModal } = useAuthContext();
  if (!!!tokenMethod.get()) {
    handleShowModal(MODAL_TYPES.Login);
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
