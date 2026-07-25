import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const withAuthHOC = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    const { isLogin, userInfo } = useContext(AuthContext);

    useEffect(() => {
      if (!isLogin || !userInfo?._id) {
        navigate("/");
      }
    }, [isLogin, userInfo, navigate]);

    if (!isLogin || !userInfo?._id) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthHOC;
