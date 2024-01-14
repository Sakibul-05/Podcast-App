import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import Loader from "../Loader";

const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  } else if (!user || error) {
    navigate("/");
  } else {
    return <Outlet />;
  }
};

export default PrivateRoutes;
